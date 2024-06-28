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
export declare type MembersCreateFormInputValues = {
    playerId?: string;
    memberPlan?: string;
    endDate?: string;
    skipTutorial?: string;
};
export declare type MembersCreateFormValidationValues = {
    playerId?: ValidationFunction<string>;
    memberPlan?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    skipTutorial?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MembersCreateFormOverridesProps = {
    MembersCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    playerId?: PrimitiveOverrideProps<TextFieldProps>;
    memberPlan?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    skipTutorial?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MembersCreateFormProps = React.PropsWithChildren<{
    overrides?: MembersCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MembersCreateFormInputValues) => MembersCreateFormInputValues;
    onSuccess?: (fields: MembersCreateFormInputValues) => void;
    onError?: (fields: MembersCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MembersCreateFormInputValues) => MembersCreateFormInputValues;
    onValidate?: MembersCreateFormValidationValues;
} & React.CSSProperties>;
export default function MembersCreateForm(props: MembersCreateFormProps): React.ReactElement;
