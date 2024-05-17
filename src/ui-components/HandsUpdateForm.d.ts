/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
    preflopNotes?: string;
    preflopHeroRange?: string;
    preflopVillainRange?: string;
    flopNotes?: string;
    flopHeroRange?: string;
    flopVillainRange?: string;
    turnNotes?: string;
    turnHeroRange?: string;
    turnVillainRange?: string;
    riverNotes?: string;
    riverHeroRange?: string;
    flopCards_1?: string;
    flopCards_3?: string;
    flopCards_2?: string;
    turnCard?: string;
    riverCard?: string;
    villainPosition?: string;
    riverVillainRange?: string;
};
export declare type HandsUpdateFormValidationValues = {
    playerId?: ValidationFunction<string>;
    tableType?: ValidationFunction<string>;
    handTags?: ValidationFunction<string>;
    heroPosition?: ValidationFunction<string>;
    handTitle?: ValidationFunction<string>;
    preflopNotes?: ValidationFunction<string>;
    preflopHeroRange?: ValidationFunction<string>;
    preflopVillainRange?: ValidationFunction<string>;
    flopNotes?: ValidationFunction<string>;
    flopHeroRange?: ValidationFunction<string>;
    flopVillainRange?: ValidationFunction<string>;
    turnNotes?: ValidationFunction<string>;
    turnHeroRange?: ValidationFunction<string>;
    turnVillainRange?: ValidationFunction<string>;
    riverNotes?: ValidationFunction<string>;
    riverHeroRange?: ValidationFunction<string>;
    flopCards_1?: ValidationFunction<string>;
    flopCards_3?: ValidationFunction<string>;
    flopCards_2?: ValidationFunction<string>;
    turnCard?: ValidationFunction<string>;
    riverCard?: ValidationFunction<string>;
    villainPosition?: ValidationFunction<string>;
    riverVillainRange?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HandsUpdateFormOverridesProps = {
    HandsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    playerId?: PrimitiveOverrideProps<TextFieldProps>;
    tableType?: PrimitiveOverrideProps<TextFieldProps>;
    handTags?: PrimitiveOverrideProps<TextAreaFieldProps>;
    heroPosition?: PrimitiveOverrideProps<TextFieldProps>;
    handTitle?: PrimitiveOverrideProps<TextFieldProps>;
    preflopNotes?: PrimitiveOverrideProps<TextFieldProps>;
    preflopHeroRange?: PrimitiveOverrideProps<TextAreaFieldProps>;
    preflopVillainRange?: PrimitiveOverrideProps<TextAreaFieldProps>;
    flopNotes?: PrimitiveOverrideProps<TextFieldProps>;
    flopHeroRange?: PrimitiveOverrideProps<TextAreaFieldProps>;
    flopVillainRange?: PrimitiveOverrideProps<TextAreaFieldProps>;
    turnNotes?: PrimitiveOverrideProps<TextFieldProps>;
    turnHeroRange?: PrimitiveOverrideProps<TextAreaFieldProps>;
    turnVillainRange?: PrimitiveOverrideProps<TextAreaFieldProps>;
    riverNotes?: PrimitiveOverrideProps<TextFieldProps>;
    riverHeroRange?: PrimitiveOverrideProps<TextAreaFieldProps>;
    flopCards_1?: PrimitiveOverrideProps<TextAreaFieldProps>;
    flopCards_3?: PrimitiveOverrideProps<TextFieldProps>;
    flopCards_2?: PrimitiveOverrideProps<TextFieldProps>;
    turnCard?: PrimitiveOverrideProps<TextAreaFieldProps>;
    riverCard?: PrimitiveOverrideProps<TextAreaFieldProps>;
    villainPosition?: PrimitiveOverrideProps<TextFieldProps>;
    riverVillainRange?: PrimitiveOverrideProps<TextAreaFieldProps>;
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
