/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createHands } from "../../mutations";
const client = generateClient();
export default function HandsCreateForm(props) {
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
    tableType: "",
    handTags: "",
    heroPosition: "",
    handTitle: "",
    myHand_1: "",
    myHand_2: "",
    preflopNotes: "",
    preflopHeroRange: "",
    preflopVillainRange: "",
    flopNotes: "",
    flopHeroRange: "",
    flopVillainRange: "",
    turnNotes: "",
    turnHeroRange: "",
    turnVillainRange: "",
    riverNotes: "",
    riverHeroRange: "",
    flopCards_1: "",
    flopCards_3: "",
    flopCards_2: "",
    turnCard: "",
    riverCard: "",
    villainPosition: "",
    riverVillainRange: "",
  };
  const [playerId, setPlayerId] = React.useState(initialValues.playerId);
  const [tableType, setTableType] = React.useState(initialValues.tableType);
  const [handTags, setHandTags] = React.useState(initialValues.handTags);
  const [heroPosition, setHeroPosition] = React.useState(
    initialValues.heroPosition
  );
  const [handTitle, setHandTitle] = React.useState(initialValues.handTitle);
  const [myHand_1, setMyHand_1] = React.useState(initialValues.myHand_1);
  const [myHand_2, setMyHand_2] = React.useState(initialValues.myHand_2);
  const [preflopNotes, setPreflopNotes] = React.useState(
    initialValues.preflopNotes
  );
  const [preflopHeroRange, setPreflopHeroRange] = React.useState(
    initialValues.preflopHeroRange
  );
  const [preflopVillainRange, setPreflopVillainRange] = React.useState(
    initialValues.preflopVillainRange
  );
  const [flopNotes, setFlopNotes] = React.useState(initialValues.flopNotes);
  const [flopHeroRange, setFlopHeroRange] = React.useState(
    initialValues.flopHeroRange
  );
  const [flopVillainRange, setFlopVillainRange] = React.useState(
    initialValues.flopVillainRange
  );
  const [turnNotes, setTurnNotes] = React.useState(initialValues.turnNotes);
  const [turnHeroRange, setTurnHeroRange] = React.useState(
    initialValues.turnHeroRange
  );
  const [turnVillainRange, setTurnVillainRange] = React.useState(
    initialValues.turnVillainRange
  );
  const [riverNotes, setRiverNotes] = React.useState(initialValues.riverNotes);
  const [riverHeroRange, setRiverHeroRange] = React.useState(
    initialValues.riverHeroRange
  );
  const [flopCards_1, setFlopCards_1] = React.useState(
    initialValues.flopCards_1
  );
  const [flopCards_3, setFlopCards_3] = React.useState(
    initialValues.flopCards_3
  );
  const [flopCards_2, setFlopCards_2] = React.useState(
    initialValues.flopCards_2
  );
  const [turnCard, setTurnCard] = React.useState(initialValues.turnCard);
  const [riverCard, setRiverCard] = React.useState(initialValues.riverCard);
  const [villainPosition, setVillainPosition] = React.useState(
    initialValues.villainPosition
  );
  const [riverVillainRange, setRiverVillainRange] = React.useState(
    initialValues.riverVillainRange
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPlayerId(initialValues.playerId);
    setTableType(initialValues.tableType);
    setHandTags(initialValues.handTags);
    setHeroPosition(initialValues.heroPosition);
    setHandTitle(initialValues.handTitle);
    setMyHand_1(initialValues.myHand_1);
    setMyHand_2(initialValues.myHand_2);
    setPreflopNotes(initialValues.preflopNotes);
    setPreflopHeroRange(initialValues.preflopHeroRange);
    setPreflopVillainRange(initialValues.preflopVillainRange);
    setFlopNotes(initialValues.flopNotes);
    setFlopHeroRange(initialValues.flopHeroRange);
    setFlopVillainRange(initialValues.flopVillainRange);
    setTurnNotes(initialValues.turnNotes);
    setTurnHeroRange(initialValues.turnHeroRange);
    setTurnVillainRange(initialValues.turnVillainRange);
    setRiverNotes(initialValues.riverNotes);
    setRiverHeroRange(initialValues.riverHeroRange);
    setFlopCards_1(initialValues.flopCards_1);
    setFlopCards_3(initialValues.flopCards_3);
    setFlopCards_2(initialValues.flopCards_2);
    setTurnCard(initialValues.turnCard);
    setRiverCard(initialValues.riverCard);
    setVillainPosition(initialValues.villainPosition);
    setRiverVillainRange(initialValues.riverVillainRange);
    setErrors({});
  };
  const validations = {
    playerId: [],
    tableType: [],
    handTags: [{ type: "JSON" }],
    heroPosition: [],
    handTitle: [{ type: "Required" }],
    myHand_1: [],
    myHand_2: [],
    preflopNotes: [],
    preflopHeroRange: [{ type: "JSON" }],
    preflopVillainRange: [{ type: "JSON" }],
    flopNotes: [],
    flopHeroRange: [{ type: "JSON" }],
    flopVillainRange: [{ type: "JSON" }],
    turnNotes: [],
    turnHeroRange: [{ type: "JSON" }],
    turnVillainRange: [{ type: "JSON" }],
    riverNotes: [],
    riverHeroRange: [{ type: "JSON" }],
    flopCards_1: [],
    flopCards_3: [],
    flopCards_2: [],
    turnCard: [],
    riverCard: [],
    villainPosition: [],
    riverVillainRange: [{ type: "JSON" }],
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
          tableType,
          handTags,
          heroPosition,
          handTitle,
          myHand_1,
          myHand_2,
          preflopNotes,
          preflopHeroRange,
          preflopVillainRange,
          flopNotes,
          flopHeroRange,
          flopVillainRange,
          turnNotes,
          turnHeroRange,
          turnVillainRange,
          riverNotes,
          riverHeroRange,
          flopCards_1,
          flopCards_3,
          flopCards_2,
          turnCard,
          riverCard,
          villainPosition,
          riverVillainRange,
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
            query: createHands.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "HandsCreateForm")}
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
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
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
        label="Table type"
        isRequired={false}
        isReadOnly={false}
        value={tableType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType: value,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.tableType ?? value;
          }
          if (errors.tableType?.hasError) {
            runValidationTasks("tableType", value);
          }
          setTableType(value);
        }}
        onBlur={() => runValidationTasks("tableType", tableType)}
        errorMessage={errors.tableType?.errorMessage}
        hasError={errors.tableType?.hasError}
        {...getOverrideProps(overrides, "tableType")}
      ></TextField>
      <TextAreaField
        label="Hand tags"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags: value,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.handTags ?? value;
          }
          if (errors.handTags?.hasError) {
            runValidationTasks("handTags", value);
          }
          setHandTags(value);
        }}
        onBlur={() => runValidationTasks("handTags", handTags)}
        errorMessage={errors.handTags?.errorMessage}
        hasError={errors.handTags?.hasError}
        {...getOverrideProps(overrides, "handTags")}
      ></TextAreaField>
      <TextField
        label="Hero position"
        isRequired={false}
        isReadOnly={false}
        value={heroPosition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition: value,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.heroPosition ?? value;
          }
          if (errors.heroPosition?.hasError) {
            runValidationTasks("heroPosition", value);
          }
          setHeroPosition(value);
        }}
        onBlur={() => runValidationTasks("heroPosition", heroPosition)}
        errorMessage={errors.heroPosition?.errorMessage}
        hasError={errors.heroPosition?.hasError}
        {...getOverrideProps(overrides, "heroPosition")}
      ></TextField>
      <TextField
        label="Hand title"
        isRequired={true}
        isReadOnly={false}
        value={handTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle: value,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.handTitle ?? value;
          }
          if (errors.handTitle?.hasError) {
            runValidationTasks("handTitle", value);
          }
          setHandTitle(value);
        }}
        onBlur={() => runValidationTasks("handTitle", handTitle)}
        errorMessage={errors.handTitle?.errorMessage}
        hasError={errors.handTitle?.hasError}
        {...getOverrideProps(overrides, "handTitle")}
      ></TextField>
      <TextField
        label="My hand 1"
        isRequired={false}
        isReadOnly={false}
        value={myHand_1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1: value,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.myHand_1 ?? value;
          }
          if (errors.myHand_1?.hasError) {
            runValidationTasks("myHand_1", value);
          }
          setMyHand_1(value);
        }}
        onBlur={() => runValidationTasks("myHand_1", myHand_1)}
        errorMessage={errors.myHand_1?.errorMessage}
        hasError={errors.myHand_1?.hasError}
        {...getOverrideProps(overrides, "myHand_1")}
      ></TextField>
      <TextField
        label="My hand 2"
        isRequired={false}
        isReadOnly={false}
        value={myHand_2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2: value,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.myHand_2 ?? value;
          }
          if (errors.myHand_2?.hasError) {
            runValidationTasks("myHand_2", value);
          }
          setMyHand_2(value);
        }}
        onBlur={() => runValidationTasks("myHand_2", myHand_2)}
        errorMessage={errors.myHand_2?.errorMessage}
        hasError={errors.myHand_2?.hasError}
        {...getOverrideProps(overrides, "myHand_2")}
      ></TextField>
      <TextField
        label="Preflop notes"
        isRequired={false}
        isReadOnly={false}
        value={preflopNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes: value,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.preflopNotes ?? value;
          }
          if (errors.preflopNotes?.hasError) {
            runValidationTasks("preflopNotes", value);
          }
          setPreflopNotes(value);
        }}
        onBlur={() => runValidationTasks("preflopNotes", preflopNotes)}
        errorMessage={errors.preflopNotes?.errorMessage}
        hasError={errors.preflopNotes?.hasError}
        {...getOverrideProps(overrides, "preflopNotes")}
      ></TextField>
      <TextAreaField
        label="Preflop hero range"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange: value,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.preflopHeroRange ?? value;
          }
          if (errors.preflopHeroRange?.hasError) {
            runValidationTasks("preflopHeroRange", value);
          }
          setPreflopHeroRange(value);
        }}
        onBlur={() => runValidationTasks("preflopHeroRange", preflopHeroRange)}
        errorMessage={errors.preflopHeroRange?.errorMessage}
        hasError={errors.preflopHeroRange?.hasError}
        {...getOverrideProps(overrides, "preflopHeroRange")}
      ></TextAreaField>
      <TextAreaField
        label="Preflop villain range"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange: value,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.preflopVillainRange ?? value;
          }
          if (errors.preflopVillainRange?.hasError) {
            runValidationTasks("preflopVillainRange", value);
          }
          setPreflopVillainRange(value);
        }}
        onBlur={() =>
          runValidationTasks("preflopVillainRange", preflopVillainRange)
        }
        errorMessage={errors.preflopVillainRange?.errorMessage}
        hasError={errors.preflopVillainRange?.hasError}
        {...getOverrideProps(overrides, "preflopVillainRange")}
      ></TextAreaField>
      <TextField
        label="Flop notes"
        isRequired={false}
        isReadOnly={false}
        value={flopNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes: value,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.flopNotes ?? value;
          }
          if (errors.flopNotes?.hasError) {
            runValidationTasks("flopNotes", value);
          }
          setFlopNotes(value);
        }}
        onBlur={() => runValidationTasks("flopNotes", flopNotes)}
        errorMessage={errors.flopNotes?.errorMessage}
        hasError={errors.flopNotes?.hasError}
        {...getOverrideProps(overrides, "flopNotes")}
      ></TextField>
      <TextAreaField
        label="Flop hero range"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange: value,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.flopHeroRange ?? value;
          }
          if (errors.flopHeroRange?.hasError) {
            runValidationTasks("flopHeroRange", value);
          }
          setFlopHeroRange(value);
        }}
        onBlur={() => runValidationTasks("flopHeroRange", flopHeroRange)}
        errorMessage={errors.flopHeroRange?.errorMessage}
        hasError={errors.flopHeroRange?.hasError}
        {...getOverrideProps(overrides, "flopHeroRange")}
      ></TextAreaField>
      <TextAreaField
        label="Flop villain range"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange: value,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.flopVillainRange ?? value;
          }
          if (errors.flopVillainRange?.hasError) {
            runValidationTasks("flopVillainRange", value);
          }
          setFlopVillainRange(value);
        }}
        onBlur={() => runValidationTasks("flopVillainRange", flopVillainRange)}
        errorMessage={errors.flopVillainRange?.errorMessage}
        hasError={errors.flopVillainRange?.hasError}
        {...getOverrideProps(overrides, "flopVillainRange")}
      ></TextAreaField>
      <TextField
        label="Turn notes"
        isRequired={false}
        isReadOnly={false}
        value={turnNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes: value,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.turnNotes ?? value;
          }
          if (errors.turnNotes?.hasError) {
            runValidationTasks("turnNotes", value);
          }
          setTurnNotes(value);
        }}
        onBlur={() => runValidationTasks("turnNotes", turnNotes)}
        errorMessage={errors.turnNotes?.errorMessage}
        hasError={errors.turnNotes?.hasError}
        {...getOverrideProps(overrides, "turnNotes")}
      ></TextField>
      <TextAreaField
        label="Turn hero range"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange: value,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.turnHeroRange ?? value;
          }
          if (errors.turnHeroRange?.hasError) {
            runValidationTasks("turnHeroRange", value);
          }
          setTurnHeroRange(value);
        }}
        onBlur={() => runValidationTasks("turnHeroRange", turnHeroRange)}
        errorMessage={errors.turnHeroRange?.errorMessage}
        hasError={errors.turnHeroRange?.hasError}
        {...getOverrideProps(overrides, "turnHeroRange")}
      ></TextAreaField>
      <TextAreaField
        label="Turn villain range"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange: value,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.turnVillainRange ?? value;
          }
          if (errors.turnVillainRange?.hasError) {
            runValidationTasks("turnVillainRange", value);
          }
          setTurnVillainRange(value);
        }}
        onBlur={() => runValidationTasks("turnVillainRange", turnVillainRange)}
        errorMessage={errors.turnVillainRange?.errorMessage}
        hasError={errors.turnVillainRange?.hasError}
        {...getOverrideProps(overrides, "turnVillainRange")}
      ></TextAreaField>
      <TextField
        label="River notes"
        isRequired={false}
        isReadOnly={false}
        value={riverNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes: value,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.riverNotes ?? value;
          }
          if (errors.riverNotes?.hasError) {
            runValidationTasks("riverNotes", value);
          }
          setRiverNotes(value);
        }}
        onBlur={() => runValidationTasks("riverNotes", riverNotes)}
        errorMessage={errors.riverNotes?.errorMessage}
        hasError={errors.riverNotes?.hasError}
        {...getOverrideProps(overrides, "riverNotes")}
      ></TextField>
      <TextAreaField
        label="River hero range"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange: value,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.riverHeroRange ?? value;
          }
          if (errors.riverHeroRange?.hasError) {
            runValidationTasks("riverHeroRange", value);
          }
          setRiverHeroRange(value);
        }}
        onBlur={() => runValidationTasks("riverHeroRange", riverHeroRange)}
        errorMessage={errors.riverHeroRange?.errorMessage}
        hasError={errors.riverHeroRange?.hasError}
        {...getOverrideProps(overrides, "riverHeroRange")}
      ></TextAreaField>
      <TextField
        label="Flop cards 1"
        isRequired={false}
        isReadOnly={false}
        value={flopCards_1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1: value,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.flopCards_1 ?? value;
          }
          if (errors.flopCards_1?.hasError) {
            runValidationTasks("flopCards_1", value);
          }
          setFlopCards_1(value);
        }}
        onBlur={() => runValidationTasks("flopCards_1", flopCards_1)}
        errorMessage={errors.flopCards_1?.errorMessage}
        hasError={errors.flopCards_1?.hasError}
        {...getOverrideProps(overrides, "flopCards_1")}
      ></TextField>
      <TextField
        label="Flop cards 3"
        isRequired={false}
        isReadOnly={false}
        value={flopCards_3}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3: value,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.flopCards_3 ?? value;
          }
          if (errors.flopCards_3?.hasError) {
            runValidationTasks("flopCards_3", value);
          }
          setFlopCards_3(value);
        }}
        onBlur={() => runValidationTasks("flopCards_3", flopCards_3)}
        errorMessage={errors.flopCards_3?.errorMessage}
        hasError={errors.flopCards_3?.hasError}
        {...getOverrideProps(overrides, "flopCards_3")}
      ></TextField>
      <TextField
        label="Flop cards 2"
        isRequired={false}
        isReadOnly={false}
        value={flopCards_2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2: value,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.flopCards_2 ?? value;
          }
          if (errors.flopCards_2?.hasError) {
            runValidationTasks("flopCards_2", value);
          }
          setFlopCards_2(value);
        }}
        onBlur={() => runValidationTasks("flopCards_2", flopCards_2)}
        errorMessage={errors.flopCards_2?.errorMessage}
        hasError={errors.flopCards_2?.hasError}
        {...getOverrideProps(overrides, "flopCards_2")}
      ></TextField>
      <TextField
        label="Turn card"
        isRequired={false}
        isReadOnly={false}
        value={turnCard}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard: value,
              riverCard,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.turnCard ?? value;
          }
          if (errors.turnCard?.hasError) {
            runValidationTasks("turnCard", value);
          }
          setTurnCard(value);
        }}
        onBlur={() => runValidationTasks("turnCard", turnCard)}
        errorMessage={errors.turnCard?.errorMessage}
        hasError={errors.turnCard?.hasError}
        {...getOverrideProps(overrides, "turnCard")}
      ></TextField>
      <TextField
        label="River card"
        isRequired={false}
        isReadOnly={false}
        value={riverCard}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard: value,
              villainPosition,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.riverCard ?? value;
          }
          if (errors.riverCard?.hasError) {
            runValidationTasks("riverCard", value);
          }
          setRiverCard(value);
        }}
        onBlur={() => runValidationTasks("riverCard", riverCard)}
        errorMessage={errors.riverCard?.errorMessage}
        hasError={errors.riverCard?.hasError}
        {...getOverrideProps(overrides, "riverCard")}
      ></TextField>
      <TextField
        label="Villain position"
        isRequired={false}
        isReadOnly={false}
        value={villainPosition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition: value,
              riverVillainRange,
            };
            const result = onChange(modelFields);
            value = result?.villainPosition ?? value;
          }
          if (errors.villainPosition?.hasError) {
            runValidationTasks("villainPosition", value);
          }
          setVillainPosition(value);
        }}
        onBlur={() => runValidationTasks("villainPosition", villainPosition)}
        errorMessage={errors.villainPosition?.errorMessage}
        hasError={errors.villainPosition?.hasError}
        {...getOverrideProps(overrides, "villainPosition")}
      ></TextField>
      <TextAreaField
        label="River villain range"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange: value,
            };
            const result = onChange(modelFields);
            value = result?.riverVillainRange ?? value;
          }
          if (errors.riverVillainRange?.hasError) {
            runValidationTasks("riverVillainRange", value);
          }
          setRiverVillainRange(value);
        }}
        onBlur={() =>
          runValidationTasks("riverVillainRange", riverVillainRange)
        }
        errorMessage={errors.riverVillainRange?.errorMessage}
        hasError={errors.riverVillainRange?.hasError}
        {...getOverrideProps(overrides, "riverVillainRange")}
      ></TextAreaField>
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
