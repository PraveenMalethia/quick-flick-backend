import { IsString, IsOptional, IsIn, IsNumber, IsArray, IsNotEmpty, IsMongoId} from "class-validator";
import { Types } from "mongoose";
import { ToObjectId } from "../../../utils/transformers";
import { CONDITIONS, EVENT_TYPE, WAGER_TYPE } from "../../../utils/constants";
import { ArrayMinSize, ArrayMaxSize } from 'class-validator';


export class CreateBetDto {
  @IsString()
  @IsOptional()
  @IsIn([EVENT_TYPE.COIN_RACE, EVENT_TYPE.CRYPTO_PRICE, EVENT_TYPE.CYO])
  event_type: string;

  @IsMongoId()
  @IsOptional()
  coin?: Types.ObjectId;

  @IsString()
  @IsOptional()
  @IsIn([CONDITIONS.GREATER_THAN_OR_EQ, CONDITIONS.LESS_THAN_OR_EQ])
  condition?: string

  @IsNumber()
  @IsOptional()
  condition_amount?: number

  @IsString()
  @IsOptional()
  @IsIn([WAGER_TYPE.FIXED, WAGER_TYPE.NO_LIMIT])
  wager_type: string

  @IsOptional()
  wager_amount?: number

  @IsOptional()
  @IsNumber()
  wager_min?: number

  @IsOptional()
  @IsNumber()
  wager_max?: number

  @IsString()
  @IsNotEmpty()
  cut_off_time: string

  @IsString()
  @IsNotEmpty()
  moment_of_truth: string

  // @IsString()
  // @IsNotEmpty()
  // cut_off_date: string

  // @IsString()
  // @IsNotEmpty()
  // moment_of_truth_date: string

  @IsString()
  league_name: string

  @IsOptional()
  is_private: boolean

  @IsString()
  @IsOptional()
  password: string

  @IsOptional()
  judge: string

  @IsNotEmpty()
  @IsString()
  category: string

  @IsOptional()
  @IsArray()
  betOptions: string[]

  @IsOptional()
  @IsString()
  publicKey: string
}


export class ParticipateBetDto {
  @IsNotEmpty()
  @IsMongoId()
  bet_id: Types.ObjectId

  @IsString()
  @IsOptional()
  @IsIn([CONDITIONS.GREATER_THAN_OR_EQ, CONDITIONS.LESS_THAN_OR_EQ])
  condition: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsOptional()
  @IsMongoId()
  coin: Types.ObjectId;

  @IsOptional()
  @IsString()
  password: string

  @IsString()
  stakePda: string

  @IsArray()
  @ArrayMinSize(10)
  @ArrayMaxSize(1000)
  @IsNumber({}, { each: true })
  serializedTx: number[];
}
