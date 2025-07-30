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