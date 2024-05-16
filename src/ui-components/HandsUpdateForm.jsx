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
import { getHands } from "../../queries";
import { updateHands } from "../../mutations";
const client = generateClient();
export default function HandsUpdateForm(props) {
  const {
    id: idProp,
    hands: handsModelProp,
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
    riverVillainRange: "",
    flopCards: "",
    turnCard: "",
    riverCard: "",
    villainPosition: "",
  };
  const [playerId, setPlayerId] = React.useState(initialValues.playerId);
  const [tableType, setTableType] = React.useState(initialValues.tableType);
  const [handTags, setHandTags] = React.useState(initialValues.handTags);
  const [heroPosition, setHeroPosition] = React.useState(
    initialValues.heroPosition
  );
  const [handTitle, setHandTitle] = React.useState(initialValues.handTitle);
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
  const [riverVillainRange, setRiverVillainRange] = React.useState(
    initialValues.riverVillainRange
  );
  const [flopCards, setFlopCards] = React.useState(initialValues.flopCards);
  const [turnCard, setTurnCard] = React.useState(initialValues.turnCard);
  const [riverCard, setRiverCard] = React.useState(initialValues.riverCard);
  const [villainPosition, setVillainPosition] = React.useState(
    initialValues.villainPosition
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = handsRecord
      ? { ...initialValues, ...handsRecord }
      : initialValues;
    setPlayerId(cleanValues.playerId);
    setTableType(cleanValues.tableType);
    setHandTags(
      typeof cleanValues.handTags === "string" || cleanValues.handTags === null
        ? cleanValues.handTags
        : JSON.stringify(cleanValues.handTags)
    );
    setHeroPosition(cleanValues.heroPosition);
    setHandTitle(cleanValues.handTitle);
    setPreflopNotes(cleanValues.preflopNotes);
    setPreflopHeroRange(
      typeof cleanValues.preflopHeroRange === "string" ||
        cleanValues.preflopHeroRange === null
        ? cleanValues.preflopHeroRange
        : JSON.stringify(cleanValues.preflopHeroRange)
    );
    setPreflopVillainRange(
      typeof cleanValues.preflopVillainRange === "string" ||
        cleanValues.preflopVillainRange === null
        ? cleanValues.preflopVillainRange
        : JSON.stringify(cleanValues.preflopVillainRange)
    );
    setFlopNotes(cleanValues.flopNotes);
    setFlopHeroRange(
      typeof cleanValues.flopHeroRange === "string" ||
        cleanValues.flopHeroRange === null
        ? cleanValues.flopHeroRange
        : JSON.stringify(cleanValues.flopHeroRange)
    );
    setFlopVillainRange(
      typeof cleanValues.flopVillainRange === "string" ||
        cleanValues.flopVillainRange === null
        ? cleanValues.flopVillainRange
        : JSON.stringify(cleanValues.flopVillainRange)
    );
    setTurnNotes(cleanValues.turnNotes);
    setTurnHeroRange(
      typeof cleanValues.turnHeroRange === "string" ||
        cleanValues.turnHeroRange === null
        ? cleanValues.turnHeroRange
        : JSON.stringify(cleanValues.turnHeroRange)
    );
    setTurnVillainRange(
      typeof cleanValues.turnVillainRange === "string" ||
        cleanValues.turnVillainRange === null
        ? cleanValues.turnVillainRange
        : JSON.stringify(cleanValues.turnVillainRange)
    );
    setRiverNotes(cleanValues.riverNotes);
    setRiverHeroRange(
      typeof cleanValues.riverHeroRange === "string" ||
        cleanValues.riverHeroRange === null
        ? cleanValues.riverHeroRange
        : JSON.stringify(cleanValues.riverHeroRange)
    );
    setRiverVillainRange(
      typeof cleanValues.riverVillainRange === "string" ||
        cleanValues.riverVillainRange === null
        ? cleanValues.riverVillainRange
        : JSON.stringify(cleanValues.riverVillainRange)
    );
    setFlopCards(
      typeof cleanValues.flopCards === "string" ||
        cleanValues.flopCards === null
        ? cleanValues.flopCards
        : JSON.stringify(cleanValues.flopCards)
    );
    setTurnCard(
      typeof cleanValues.turnCard === "string" || cleanValues.turnCard === null
        ? cleanValues.turnCard
        : JSON.stringify(cleanValues.turnCard)
    );
    setRiverCard(
      typeof cleanValues.riverCard === "string" ||
        cleanValues.riverCard === null
        ? cleanValues.riverCard
        : JSON.stringify(cleanValues.riverCard)
    );
    setVillainPosition(cleanValues.villainPosition);
    setErrors({});
  };
  const [handsRecord, setHandsRecord] = React.useState(handsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getHands.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getHands
        : handsModelProp;
      setHandsRecord(record);
    };
    queryData();
  }, [idProp, handsModelProp]);
  React.useEffect(resetStateValues, [handsRecord]);
  const validations = {
    playerId: [],
    tableType: [],
    handTags: [{ type: "JSON" }],
    heroPosition: [],
    handTitle: [{ type: "Required" }],
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
    riverVillainRange: [{ type: "JSON" }],
    flopCards: [{ type: "JSON" }],
    turnCard: [{ type: "JSON" }],
    riverCard: [{ type: "JSON" }],
    villainPosition: [],
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
          playerId: playerId ?? null,
          tableType: tableType ?? null,
          handTags: handTags ?? null,
          heroPosition: heroPosition ?? null,
          handTitle,
          preflopNotes: preflopNotes ?? null,
          preflopHeroRange: preflopHeroRange ?? null,
          preflopVillainRange: preflopVillainRange ?? null,
          flopNotes: flopNotes ?? null,
          flopHeroRange: flopHeroRange ?? null,
          flopVillainRange: flopVillainRange ?? null,
          turnNotes: turnNotes ?? null,
          turnHeroRange: turnHeroRange ?? null,
          turnVillainRange: turnVillainRange ?? null,
          riverNotes: riverNotes ?? null,
          riverHeroRange: riverHeroRange ?? null,
          riverVillainRange: riverVillainRange ?? null,
          flopCards: flopCards ?? null,
          turnCard: turnCard ?? null,
          riverCard: riverCard ?? null,
          villainPosition: villainPosition ?? null,
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
            query: updateHands.replaceAll("__typename", ""),
            variables: {
              input: {
                id: handsRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "HandsUpdateForm")}
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
        value={handTags}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags: value,
              heroPosition,
              handTitle,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
        value={preflopHeroRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
        value={preflopVillainRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
        value={flopHeroRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
        value={flopVillainRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
        value={turnHeroRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
        value={turnVillainRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
        value={riverHeroRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
      <TextAreaField
        label="River villain range"
        isRequired={false}
        isReadOnly={false}
        value={riverVillainRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
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
              riverVillainRange: value,
              flopCards,
              turnCard,
              riverCard,
              villainPosition,
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
      <TextAreaField
        label="Flop cards"
        isRequired={false}
        isReadOnly={false}
        value={flopCards}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              playerId,
              tableType,
              handTags,
              heroPosition,
              handTitle,
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
              riverVillainRange,
              flopCards: value,
              turnCard,
              riverCard,
              villainPosition,
            };
            const result = onChange(modelFields);
            value = result?.flopCards ?? value;
          }
          if (errors.flopCards?.hasError) {
            runValidationTasks("flopCards", value);
          }
          setFlopCards(value);
        }}
        onBlur={() => runValidationTasks("flopCards", flopCards)}
        errorMessage={errors.flopCards?.errorMessage}
        hasError={errors.flopCards?.hasError}
        {...getOverrideProps(overrides, "flopCards")}
      ></TextAreaField>
      <TextAreaField
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
              riverVillainRange,
              flopCards,
              turnCard: value,
              riverCard,
              villainPosition,
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
      ></TextAreaField>
      <TextAreaField
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard: value,
              villainPosition,
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
      ></TextAreaField>
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
              riverVillainRange,
              flopCards,
              turnCard,
              riverCard,
              villainPosition: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || handsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || handsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
