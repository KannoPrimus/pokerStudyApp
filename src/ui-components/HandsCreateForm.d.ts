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
export declare type HandsCreateFormInputValues = {
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
    riverVillainRange?: string;
    flopCards?: string;
    turnCard?: string;
    riverCard?: string;
    villainPosition?: string;
};
export declare type HandsCreateFormValidationValues = {
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
    riverVillainRange?: ValidationFunction<string>;
    flopCards?: ValidationFunction<string>;
    turnCard?: ValidationFunction<string>;
    riverCard?: ValidationFunction<string>;
    villainPosition?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HandsCreateFormOverridesProps = {
    HandsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
    riverVillainRange?: PrimitiveOverrideProps<TextAreaFieldProps>;
    flopCards?: PrimitiveOverrideProps<TextAreaFieldProps>;
    turnCard?: PrimitiveOverrideProps<TextAreaFieldProps>;
    riverCard?: PrimitiveOverrideProps<TextAreaFieldProps>;
    villainPosition?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HandsCreateFormProps = React.PropsWithChildren<{
    overrides?: HandsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HandsCreateFormInputValues) => HandsCreateFormInputValues;
    onSuccess?: (fields: HandsCreateFormInputValues) => void;
    onError?: (fields: HandsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HandsCreateFormInputValues) => HandsCreateFormInputValues;
    onValidate?: HandsCreateFormValidationValues;
} & React.CSSProperties>;
export default function HandsCreateForm(props: HandsCreateFormProps): React.ReactElement;
