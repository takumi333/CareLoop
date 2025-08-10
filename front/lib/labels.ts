import { NewRelations } from "@/types";

// Record型第一引数に、インデックスアクセス型を使用して、statusプロパティを再利用
export const STATUS_LABEL: Record<NewRelations["status"], string> = {
  pending:  "申請中",
  accepted: "承認済み",
  rejected: "却下",
};

export const ROLE_LABEL: Record<NewRelations["role"], string> = {
  patient: "患者",
  home_care_giver: "在宅介護者",
  medical_personal: "医療従事者",
};

