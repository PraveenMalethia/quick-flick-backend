import { IsNotEmpty, IsString, Matches } from "class-validator";

export class WalletConnectDto {
  @IsNotEmpty({ message: "Wallet address is required" })
  @IsString({ message: "Wallet address must be a string" })
  @Matches(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/, {
    message: "Invalid wallet address format",
  })
  walletAddress: string;
}
