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
export declare type MembersUpdateFormInputValues = {
    playerId?: string;
    memberPlan?: string;
    endDate?: string;
};
export declare type MembersUpdateFormValidationValues = {
    playerId?: ValidationFunction<string>;
    memberPlan?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MembersUpdateFormOverridesProps = {
    MembersUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    playerId?: PrimitiveOverrideProps<TextFieldProps>;
    memberPlan?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MembersUpdateFormProps = React.PropsWithChildren<{
    overrides?: MembersUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    members?: any;
    onSubmit?: (fields: MembersUpdateFormInputValues) => MembersUpdateFormInputValues;
    onSuccess?: (fields: MembersUpdateFormInputValues) => void;
    onError?: (fields: MembersUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MembersUpdateFormInputValues) => MembersUpdateFormInputValues;
    onValidate?: MembersUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MembersUpdateForm(props: MembersUpdateFormProps): React.ReactElement;
