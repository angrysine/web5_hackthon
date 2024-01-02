// Description: This file contains the code for creating and verifying a Verifiable Credential.
import { VerifiableCredential } from "@web5/credentials";
class StreetCredibility {
  constructor(localRespect, legit) {
    this.localRespect = localRespect;
    this.legit = legit;
  }
}
import { DidKeyMethod } from "@web5/dids";
const issuer = await DidKeyMethod.create();
console.log("Issuer DID:", issuer.did);
const vc = await VerifiableCredential.create({
  type: "StreetCred",
  issuer: issuer,
  subject: "did:dock:5FvyFFcqAi9WiNNiQSPfc5bjKXheFjUeR4AmQdNhe9PQFKSq",
  data: new StreetCredibility("high", true),
});

const vcJwt = await vc.sign({ did: issuer });

try {
  let a = await VerifiableCredential.verify({ vcJwt: vcJwt });
  console.log("VC Verification successful!");
  console.log(a);
} catch (e) {
  console.log(e);
}
