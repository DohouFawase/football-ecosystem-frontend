import { Organization } from "@/types/OrganizationType";

export const MOCK_ORGANIZATION: Organization = {
  id: "0a2a327b-697d-43c7-bf0c-5e6f438ce536",
  name: "E-Sports Brefste",
  description: "Une organisation dédiée aux tournois locaux.",
  logoUrl: "https://mon-image.com/logo.png",
  ownerId: "65b6a013-c8a5-4bb7-a553-b81b016de07c",
  legalName: "E-Sports Association SARL",
  registrationNumber: "123456789",
  address: "123 Rue de la Game, Cotonou",
  phone: "+22900000000",
  email: "contact@esports-asso.bj",
  website: "https://esports-asso.bj",
  documents: [
    {
      url: "https://storage.com/docs/statuts.pdf",
      type: "statuts"
    },
    {
      url: "https://storage.com/docs/id.png",
      type: "identity"
    }
  ],
  status: "APPROVED",
  rejectionReason: null,
  approvedBy: null,
  approvedAt: null,
  createdAt: "2026-02-03T09:01:02.368Z",
  updatedAt: "2026-02-03T09:01:02.368Z",
  owner: {
    id: "65b6a013-c8a5-4bb7-a553-b81b016de07c",
    firstName: null,
    lastName: null,
    email: "dohoufawase@gmail.com",
    phone: null,
    kycStatus: "approved"
  },
  _count: {
    leagues: 0
  }
};