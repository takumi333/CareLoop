export type Profile = {
    partner_id: string;
    name: string;
    user: {
      id: number,
      uid: string,
      name: string,
      provider: string,
      role: string,
    };
};

export type RapProfile = {
  profile: Profile
}

type NewRelations = {
  partner_id: number,
  image: string,
  name: string,
  role: "patient" | "home_care_giver" | "medical_personal",
  status: "pending" | "accepted" | "rejected";
}