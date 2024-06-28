/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createMembers } from "../../mutations";
const client = generateClient();
export default function MembersCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    playerId: "",
    memberPlan: "",
    endDate: "",
    skipTutorial: "",
  };
  const [playerId, setPlayerId] = React.useState(initialValues.playerId);
  const [memberPlan, setMemberPlan] = React.useState(initialValues.memberPlan);
  const [endDate, setEndDate] = React.useState(initialValues.endDate);
  const [skipTutorial, setSkipTutorial] = React.useState(
    initialValues.skipTutorial
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPlayerId(initialValues.playerId);
    setMemberPlan(initialValues.memberPlan);
    setEndDate(initialValues.endDate);
    setSkipTutorial(initialValues.skipTutorial);
    setErrors({});
  };
  const validations = {
    playerId: [],
    memberPlan: [],
    endDate: [],
    skipTutorial: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          playerId,
          memberPlan,
          endDate,
          skipTutorial,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createMembers.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MembersCreateForm")}
      {...rest}
    >
      <TextField
        label="Player id"
        isRequired={false}
        isReadOnly={false}
        value={playerId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId: value,
              memberPlan,
              endDate,
              skipTutorial,
            };
            const result = onChange(modelFields);
            value = result?.playerId ?? value;
          }
          if (errors.playerId?.hasError) {
            runValidationTasks("playerId", value);
          }
          setPlayerId(value);
        }}
        onBlur={() => runValidationTasks("playerId", playerId)}
        errorMessage={errors.playerId?.errorMessage}
        hasError={errors.playerId?.hasError}
        {...getOverrideProps(overrides, "playerId")}
      ></TextField>
      <TextField
        label="Member plan"
        isRequired={false}
        isReadOnly={false}
        value={memberPlan}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              memberPlan: value,
              endDate,
              skipTutorial,
            };
            const result = onChange(modelFields);
            value = result?.memberPlan ?? value;
          }
          if (errors.memberPlan?.hasError) {
            runValidationTasks("memberPlan", value);
          }
          setMemberPlan(value);
        }}
        onBlur={() => runValidationTasks("memberPlan", memberPlan)}
        errorMessage={errors.memberPlan?.errorMessage}
        hasError={errors.memberPlan?.hasError}
        {...getOverrideProps(overrides, "memberPlan")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={endDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              memberPlan,
              endDate: value,
              skipTutorial,
            };
            const result = onChange(modelFields);
            value = result?.endDate ?? value;
          }
          if (errors.endDate?.hasError) {
            runValidationTasks("endDate", value);
          }
          setEndDate(value);
        }}
        onBlur={() => runValidationTasks("endDate", endDate)}
        errorMessage={errors.endDate?.errorMessage}
        hasError={errors.endDate?.hasError}
        {...getOverrideProps(overrides, "endDate")}
      ></TextField>
      <TextField
        label="Skip tutorial"
        isRequired={false}
        isReadOnly={false}
        value={skipTutorial}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              memberPlan,
              endDate,
              skipTutorial: value,
            };
            const result = onChange(modelFields);
            value = result?.skipTutorial ?? value;
          }
          if (errors.skipTutorial?.hasError) {
            runValidationTasks("skipTutorial", value);
          }
          setSkipTutorial(value);
        }}
        onBlur={() => runValidationTasks("skipTutorial", skipTutorial)}
        errorMessage={errors.skipTutorial?.errorMessage}
        hasError={errors.skipTutorial?.hasError}
        {...getOverrideProps(overrides, "skipTutorial")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
