import { Schema, model, Document } from "mongoose";
import { Types } from "mongoose";
const moment = require("moment-timezone");

export interface IUserStake {
  user: Types.ObjectId;
  condition?: string;
  coin?: Types.ObjectId;
  final_amount: number;
  original_amount: number;
  pda: string;
  winning_amount?: number;
  is_winner?: boolean;
}

export interface IBet extends Document {
  category: "Crypto" | "Stocks" | "Sports" | "Custom";
  event_type?: "Crypto Price" | "Coin Race" | "Stock Price" | "Stock Race" | "Create Your Own";
  coin?: Schema.Types.ObjectId;
  result_coin?: Schema.Types.ObjectId;
  condition?: 'GT' | 'LT'
  condition_amount?: number
  result_condition: 'GT' | 'LT'
  result_condition_amount: number
  wager_type?: "No Limit" | "Fixed";
  wager_amount?: number;
  wager_min?: number;
  wager_max?: number;
  cut_off_time: Date;
  moment_of_truth: Date;
  league_name: string;
  pda: string;
  betVaultAta: string;
  betVaultAuthority: string;
  is_private: boolean;
  password?: string;
  dispute_resolution: string;
  faq: string;
  event: Schema.Types.ObjectId;
  created_by: Schema.Types.ObjectId;
  banner_url?: string;
  betOptions?: string[];
  user_stakes: IUserStake[];
  status: "Draft" | "Live" | "Expired" | "Locked" | "Verdict" | "Dispute" | "Final Verdict" | "Settlement" | "Void"
  is_decided: boolean;
  is_deleted: boolean;
  total_users_won?: number;
  total_users_lost?: number;
  total_amount_won?: number;
  total_amount_lost?: number;
  disbursed?: boolean;
  disbursement_date?: Date;
  disbursement_transaction_ids?: string[];
  total_disbursed_amount?: number;
}

export const userStakeSchema = new Schema<IUserStake>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    condition: { type: String, required: false },
    coin: { type: Schema.Types.ObjectId, ref: "Coin", required: false },
    final_amount: { type: Number, required: true },
    original_amount: { type: Number, required: true },
    pda: { type: String, required: true },
    winning_amount: { type: Number, required: false, default: 0 },
    is_winner: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const betSchema = new Schema<IBet>(
  {
    category: { type: String, required: true, enum: ["Crypto", "Stocks", "Sports", "Custom"] },
    event_type: {
      type: String,
      enum: ["Crypto Price", "Coin Race", "Stock Price", "Stock Race", "Create Your Own"],
      required: false,
    },
    coin: { type: Schema.Types.ObjectId, ref: "Coin", required: false },
    result_coin: { type: Schema.Types.ObjectId, ref: "Coin", required: false },
    condition: { type: String, required: false },
    condition_amount: { type: Number, required: false },
    result_condition: { type: String, required: false },
    pda: { type: String, required: false },
    betVaultAta: { type: String, required: false },
    betVaultAuthority: { type: String, required: false },
    result_condition_amount: { type: Number, required: false },
    wager_type: {
      type: String,
      enum: ["No Limit", "Fixed"],
      required: false,
    },
    wager_amount: { type: Number, required: false },
    wager_min: { type: Number, required: false },
    wager_max: { type: Number, required: false },
    cut_off_time: { type: Date, required: true },
    moment_of_truth: { type: Date, required: true },
    league_name: { type: String, required: true },
    is_private: {
      type: Boolean,
      default: false,
    },
    password: { type: String, required: false },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: false },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    banner_url: { type: String },
    betOptions: {
      type: [String],
      required: false,
      validate: {
        validator: function (v: string[]) {
          return !v || v.length <= 4; // Maximum 4 options allowed
        },
        message: props => `Only a maximum of 4 betting options are allowed`
      }
    },
    user_stakes: [userStakeSchema],
    status: {
      type: String,
      enum: ["Draft", "Live", "Expired", "Locked", "Verdict", "Dispute", "Final Verdict", "Settlement", "Void"],
      default: "Live"
    },
    is_decided: { type: Boolean, default: false },
    total_users_won: { type: Number, default: 0 },
    total_users_lost: { type: Number, default: 0 },
    total_amount_won: { type: Number, default: 0 },
    total_amount_lost: { type: Number, default: 0 },
    is_deleted: { type: Boolean, default: false },
    disbursed: { type: Boolean, default: false },
    disbursement_date: { type: Date, required: false },
    disbursement_transaction_ids: { type: [String], required: false },
    total_disbursed_amount: { type: Number, required: false },
  },
  { timestamps: true }
);

betSchema.post("find", (docs) => {
  docs.forEach((doc: any) => {
    doc.start_time = moment(doc.start_time)
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
    doc.end_time = moment(doc.end_time)
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
  });
});

export const Bet = model<IBet>("Bet", betSchema);
