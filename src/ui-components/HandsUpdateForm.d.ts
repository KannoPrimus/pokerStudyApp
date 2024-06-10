/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HandsUpdateFormInputValues = {
    playerId?: string;
    tableType?: string;
    handTags?: string;
    heroPosition?: string;
    handTitle?: string;
    myHand_1?: string;
    myHand_2?: string;
    preflopNotes?: string;
    preflopAction?: string;
    preflopHeroRange?: string;
    preflopVillainRange?: string;
    flopNotes?: string;
    flopAction?: string;
    flopHeroRange?: string;
    flopVillainRange?: string;
    turnNotes?: string;
    turnAction?: string;
    turnHeroRange?: string;
    turnVillainRange?: string;
    riverNotes?: string;
    riverAction?: string;
    riverHeroRange?: string;
    flopCards_1?: string;
    flopCards_3?: string;
    flopCards_2?: string;
    turnCard?: string;
    riverCard?: string;
    villainPosition?: string;
    riverVillainRange?: string;
    stake?: string;
    share?: string;
    description?: string;
};
export declare type HandsUpdateFormValidationValues = {
    playerId?: ValidationFunction<string>;
    tableType?: ValidationFunction<string>;
    handTags?: ValidationFunction<string>;
    heroPosition?: ValidationFunction<string>;
    handTitle?: ValidationFunction<string>;
    myHand_1?: ValidationFunction<string>;
    myHand_2?: ValidationFunction<string>;
    preflopNotes?: ValidationFunction<string>;
    preflopAction?: ValidationFunction<string>;
    preflopHeroRange?: ValidationFunction<string>;
    preflopVillainRange?: ValidationFunction<string>;
    flopNotes?: ValidationFunction<string>;
    flopAction?: ValidationFunction<string>;
    flopHeroRange?: ValidationFunction<string>;
    flopVillainRange?: ValidationFunction<string>;
    turnNotes?: ValidationFunction<string>;
    turnAction?: ValidationFunction<string>;
    turnHeroRange?: ValidationFunction<string>;
    turnVillainRange?: ValidationFunction<string>;
    riverNotes?: ValidationFunction<string>;
    riverAction?: ValidationFunction<string>;
    riverHeroRange?: ValidationFunction<string>;
    flopCards_1?: ValidationFunction<string>;
    flopCards_3?: ValidationFunction<string>;
    flopCards_2?: ValidationFunction<string>;
    turnCard?: ValidationFunction<string>;
    riverCard?: ValidationFunction<string>;
    villainPosition?: ValidationFunction<string>;
    riverVillainRange?: ValidationFunction<string>;
    stake?: ValidationFunction<string>;
    share?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HandsUpdateFormOverridesProps = {
    HandsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    playerId?: PrimitiveOverrideProps<TextFieldProps>;
    tableType?: PrimitiveOverrideProps<TextFieldProps>;
    handTags?: PrimitiveOverrideProps<TextFieldProps>;
    heroPosition?: PrimitiveOverrideProps<TextFieldProps>;
    handTitle?: PrimitiveOverrideProps<TextFieldProps>;
    myHand_1?: PrimitiveOverrideProps<TextFieldProps>;
    myHand_2?: PrimitiveOverrideProps<TextFieldProps>;
    preflopNotes?: PrimitiveOverrideProps<TextFieldProps>;
    preflopAction?: PrimitiveOverrideProps<TextFieldProps>;
    preflopHeroRange?: PrimitiveOverrideProps<TextFieldProps>;
    preflopVillainRange?: PrimitiveOverrideProps<TextFieldProps>;
    flopNotes?: PrimitiveOverrideProps<TextFieldProps>;
    flopAction?: PrimitiveOverrideProps<TextFieldProps>;
    flopHeroRange?: PrimitiveOverrideProps<TextFieldProps>;
    flopVillainRange?: PrimitiveOverrideProps<TextFieldProps>;
    turnNotes?: PrimitiveOverrideProps<TextFieldProps>;
    turnAction?: PrimitiveOverrideProps<TextFieldProps>;
    turnHeroRange?: PrimitiveOverrideProps<TextFieldProps>;
    turnVillainRange?: PrimitiveOverrideProps<TextFieldProps>;
    riverNotes?: PrimitiveOverrideProps<TextFieldProps>;
    riverAction?: PrimitiveOverrideProps<TextFieldProps>;
    riverHeroRange?: PrimitiveOverrideProps<TextFieldProps>;
    flopCards_1?: PrimitiveOverrideProps<TextFieldProps>;
    flopCards_3?: PrimitiveOverrideProps<TextFieldProps>;
    flopCards_2?: PrimitiveOverrideProps<TextFieldProps>;
    turnCard?: PrimitiveOverrideProps<TextFieldProps>;
    riverCard?: PrimitiveOverrideProps<TextFieldProps>;
    villainPosition?: PrimitiveOverrideProps<TextFieldProps>;
    riverVillainRange?: PrimitiveOverrideProps<TextFieldProps>;
    stake?: PrimitiveOverrideProps<TextFieldProps>;
    share?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HandsUpdateFormProps = React.PropsWithChildren<{
    overrides?: HandsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    hands?: any;
    onSubmit?: (fields: HandsUpdateFormInputValues) => HandsUpdateFormInputValues;
    onSuccess?: (fields: HandsUpdateFormInputValues) => void;
    onError?: (fields: HandsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HandsUpdateFormInputValues) => HandsUpdateFormInputValues;
    onValidate?: HandsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HandsUpdateForm(props: HandsUpdateFormProps): React.ReactElement;
