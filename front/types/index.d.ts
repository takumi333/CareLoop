export type Profile = {
    partner_id: string;
    name: string;
    user: {
      id: number,
      uid?: string,
      name: string,
      provider: string,
      role: string,
    };
};

export type RapProfile = {
  profile: Profile
}

type NewRelations = {
  id: number,
  partner_id: number,
  image: string,
  name: string,
  role: "patient" | "home_care_giver" | "medical_personal",
  status: "pending" | "accepted" | "rejected";
  nicknames?: Array<{name: string}>,
}

type RelationAddFromProps = {
  close: (value: React.SetStateAction<boolean>) => void,
  mutate:  KeyedMutator<any>,
  sessionId?: string,
  partnerId?: number,
}