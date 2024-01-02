import { DidKeyMethod } from "@web5/dids";

const fanClubIssuerDid = await DidKeyMethod.create();
const aliceDid = await DidKeyMethod.create();
console.log("Fan Club Issuer DID:", fanClubIssuerDid.did);
console.log("Alice DID:", aliceDid.did);
import { VerifiableCredential, PresentationExchange } from "@web5/credentials";

class SwiftiesFanClub {
  constructor(level, legit) {
    // indicates the fan's dedication level
    this.level = level;

    // indicates if the fan is a genuine Swiftie
    this.legit = legit;
  }
}

const vc = await VerifiableCredential.create({
  type: "SwiftiesFanClub",
  issuer: fanClubIssuerDid.did,
  subject: aliceDid.did,
  data: new SwiftiesFanClub("Stan", false),
});
console.log("VC:", vc);

const signedVcJwt = await vc.sign({ did: fanClubIssuerDid });

const presentationDefinition = {
  id: "presDefId123",
  name: "Swifties Fan Club Presentation Definition",
  purpose: "for proving membership in the fan club",
  input_descriptors: [
    {
      id: "legitness",
      purpose: "are you legit or not?",
      constraints: {
        fields: [
          {
            path: ["$.credentialSubject.legit"],
          },
        ],
      },
    },
  ],
};

const definitionValidation = PresentationExchange.validateDefinition({
  presentationDefinition,
});
// Does VC Satisfy the Presentation Definition
try {
  PresentationExchange.satisfiesPresentationDefinition({
    vcJwts: [signedVcJwt],
    presentationDefinition: presentationDefinition,
  });
  console.log("\nVC Satisfies Presentation Definition!\n");
} catch (err) {
  console.log("VC does not satisfy Presentation Definition: " + err.message);
}
try {
  let a = await VerifiableCredential.verify({ vcJwt: signedVcJwt });
  console.log("VC Verification successful!");
  console.log(a);
} catch (e) {
  console.log(e);
}
