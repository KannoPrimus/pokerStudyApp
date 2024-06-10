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
    myHand_1: "",
    myHand_2: "",
    preflopNotes: "",
    preflopAction: "",
    preflopHeroRange: "",
    preflopVillainRange: "",
    flopNotes: "",
    flopAction: "",
    flopHeroRange: "",
    flopVillainRange: "",
    turnNotes: "",
    turnAction: "",
    turnHeroRange: "",
    turnVillainRange: "",
    riverNotes: "",
    riverAction: "",
    riverHeroRange: "",
    flopCards_1: "",
    flopCards_3: "",
    flopCards_2: "",
    turnCard: "",
    riverCard: "",
    villainPosition: "",
    riverVillainRange: "",
    stake: "",
    share: "",
    description: "",
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
  const [preflopAction, setPreflopAction] = React.useState(
    initialValues.preflopAction
  );
  const [preflopHeroRange, setPreflopHeroRange] = React.useState(
    initialValues.preflopHeroRange
  );
  const [preflopVillainRange, setPreflopVillainRange] = React.useState(
    initialValues.preflopVillainRange
  );
  const [flopNotes, setFlopNotes] = React.useState(initialValues.flopNotes);
  const [flopAction, setFlopAction] = React.useState(initialValues.flopAction);
  const [flopHeroRange, setFlopHeroRange] = React.useState(
    initialValues.flopHeroRange
  );
  const [flopVillainRange, setFlopVillainRange] = React.useState(
    initialValues.flopVillainRange
  );
  const [turnNotes, setTurnNotes] = React.useState(initialValues.turnNotes);
  const [turnAction, setTurnAction] = React.useState(initialValues.turnAction);
  const [turnHeroRange, setTurnHeroRange] = React.useState(
    initialValues.turnHeroRange
  );
  const [turnVillainRange, setTurnVillainRange] = React.useState(
    initialValues.turnVillainRange
  );
  const [riverNotes, setRiverNotes] = React.useState(initialValues.riverNotes);
  const [riverAction, setRiverAction] = React.useState(
    initialValues.riverAction
  );
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
  const [stake, setStake] = React.useState(initialValues.stake);
  const [share, setShare] = React.useState(initialValues.share);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = handsRecord
      ? { ...initialValues, ...handsRecord }
      : initialValues;
    setPlayerId(cleanValues.playerId);
    setTableType(cleanValues.tableType);
    setHandTags(cleanValues.handTags);
    setHeroPosition(cleanValues.heroPosition);
    setHandTitle(cleanValues.handTitle);
    setMyHand_1(cleanValues.myHand_1);
    setMyHand_2(cleanValues.myHand_2);
    setPreflopNotes(cleanValues.preflopNotes);
    setPreflopAction(cleanValues.preflopAction);
    setPreflopHeroRange(cleanValues.preflopHeroRange);
    setPreflopVillainRange(cleanValues.preflopVillainRange);
    setFlopNotes(cleanValues.flopNotes);
    setFlopAction(cleanValues.flopAction);
    setFlopHeroRange(cleanValues.flopHeroRange);
    setFlopVillainRange(cleanValues.flopVillainRange);
    setTurnNotes(cleanValues.turnNotes);
    setTurnAction(cleanValues.turnAction);
    setTurnHeroRange(cleanValues.turnHeroRange);
    setTurnVillainRange(cleanValues.turnVillainRange);
    setRiverNotes(cleanValues.riverNotes);
    setRiverAction(cleanValues.riverAction);
    setRiverHeroRange(cleanValues.riverHeroRange);
    setFlopCards_1(cleanValues.flopCards_1);
    setFlopCards_3(cleanValues.flopCards_3);
    setFlopCards_2(cleanValues.flopCards_2);
    setTurnCard(cleanValues.turnCard);
    setRiverCard(cleanValues.riverCard);
    setVillainPosition(cleanValues.villainPosition);
    setRiverVillainRange(cleanValues.riverVillainRange);
    setStake(cleanValues.stake);
    setShare(cleanValues.share);
    setDescription(cleanValues.description);
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
    handTags: [],
    heroPosition: [],
    handTitle: [{ type: "Required" }],
    myHand_1: [],
    myHand_2: [],
    preflopNotes: [],
    preflopAction: [],
    preflopHeroRange: [],
    preflopVillainRange: [],
    flopNotes: [],
    flopAction: [],
    flopHeroRange: [],
    flopVillainRange: [],
    turnNotes: [],
    turnAction: [],
    turnHeroRange: [],
    turnVillainRange: [],
    riverNotes: [],
    riverAction: [],
    riverHeroRange: [],
    flopCards_1: [],
    flopCards_3: [],
    flopCards_2: [],
    turnCard: [],
    riverCard: [],
    villainPosition: [],
    riverVillainRange: [],
    stake: [],
    share: [],
    description: [],
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
          myHand_1: myHand_1 ?? null,
          myHand_2: myHand_2 ?? null,
          preflopNotes: preflopNotes ?? null,
          preflopAction: preflopAction ?? null,
          preflopHeroRange: preflopHeroRange ?? null,
          preflopVillainRange: preflopVillainRange ?? null,
          flopNotes: flopNotes ?? null,
          flopAction: flopAction ?? null,
          flopHeroRange: flopHeroRange ?? null,
          flopVillainRange: flopVillainRange ?? null,
          turnNotes: turnNotes ?? null,
          turnAction: turnAction ?? null,
          turnHeroRange: turnHeroRange ?? null,
          turnVillainRange: turnVillainRange ?? null,
          riverNotes: riverNotes ?? null,
          riverAction: riverAction ?? null,
          riverHeroRange: riverHeroRange ?? null,
          flopCards_1: flopCards_1 ?? null,
          flopCards_3: flopCards_3 ?? null,
          flopCards_2: flopCards_2 ?? null,
          turnCard: turnCard ?? null,
          riverCard: riverCard ?? null,
          villainPosition: villainPosition ?? null,
          riverVillainRange: riverVillainRange ?? null,
          stake: stake ?? null,
          share: share ?? null,
          description: description ?? null,
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      <TextField
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      ></TextField>
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      <TextField
        label="Preflop action"
        isRequired={false}
        isReadOnly={false}
        value={preflopAction}
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
              preflopAction: value,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
            };
            const result = onChange(modelFields);
            value = result?.preflopAction ?? value;
          }
          if (errors.preflopAction?.hasError) {
            runValidationTasks("preflopAction", value);
          }
          setPreflopAction(value);
        }}
        onBlur={() => runValidationTasks("preflopAction", preflopAction)}
        errorMessage={errors.preflopAction?.errorMessage}
        hasError={errors.preflopAction?.hasError}
        {...getOverrideProps(overrides, "preflopAction")}
      ></TextField>
      <TextField
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange: value,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      ></TextField>
      <TextField
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange,
              preflopVillainRange: value,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      ></TextField>
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes: value,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      <TextField
        label="Flop action"
        isRequired={false}
        isReadOnly={false}
        value={flopAction}
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction: value,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
            };
            const result = onChange(modelFields);
            value = result?.flopAction ?? value;
          }
          if (errors.flopAction?.hasError) {
            runValidationTasks("flopAction", value);
          }
          setFlopAction(value);
        }}
        onBlur={() => runValidationTasks("flopAction", flopAction)}
        errorMessage={errors.flopAction?.errorMessage}
        hasError={errors.flopAction?.hasError}
        {...getOverrideProps(overrides, "flopAction")}
      ></TextField>
      <TextField
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange: value,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      ></TextField>
      <TextField
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange: value,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      ></TextField>
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes: value,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      <TextField
        label="Turn action"
        isRequired={false}
        isReadOnly={false}
        value={turnAction}
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction: value,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
            };
            const result = onChange(modelFields);
            value = result?.turnAction ?? value;
          }
          if (errors.turnAction?.hasError) {
            runValidationTasks("turnAction", value);
          }
          setTurnAction(value);
        }}
        onBlur={() => runValidationTasks("turnAction", turnAction)}
        errorMessage={errors.turnAction?.errorMessage}
        hasError={errors.turnAction?.hasError}
        {...getOverrideProps(overrides, "turnAction")}
      ></TextField>
      <TextField
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange: value,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      ></TextField>
      <TextField
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange: value,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      ></TextField>
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes: value,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      <TextField
        label="River action"
        isRequired={false}
        isReadOnly={false}
        value={riverAction}
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction: value,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
            };
            const result = onChange(modelFields);
            value = result?.riverAction ?? value;
          }
          if (errors.riverAction?.hasError) {
            runValidationTasks("riverAction", value);
          }
          setRiverAction(value);
        }}
        onBlur={() => runValidationTasks("riverAction", riverAction)}
        errorMessage={errors.riverAction?.errorMessage}
        hasError={errors.riverAction?.hasError}
        {...getOverrideProps(overrides, "riverAction")}
      ></TextField>
      <TextField
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange: value,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
      ></TextField>
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1: value,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3: value,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2: value,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard: value,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard: value,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description,
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition: value,
              riverVillainRange,
              stake,
              share,
              description,
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
      <TextField
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
              myHand_1,
              myHand_2,
              preflopNotes,
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange: value,
              stake,
              share,
              description,
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
      ></TextField>
      <TextField
        label="Stake"
        isRequired={false}
        isReadOnly={false}
        value={stake}
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake: value,
              share,
              description,
            };
            const result = onChange(modelFields);
            value = result?.stake ?? value;
          }
          if (errors.stake?.hasError) {
            runValidationTasks("stake", value);
          }
          setStake(value);
        }}
        onBlur={() => runValidationTasks("stake", stake)}
        errorMessage={errors.stake?.errorMessage}
        hasError={errors.stake?.hasError}
        {...getOverrideProps(overrides, "stake")}
      ></TextField>
      <TextField
        label="Share"
        isRequired={false}
        isReadOnly={false}
        value={share}
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share: value,
              description,
            };
            const result = onChange(modelFields);
            value = result?.share ?? value;
          }
          if (errors.share?.hasError) {
            runValidationTasks("share", value);
          }
          setShare(value);
        }}
        onBlur={() => runValidationTasks("share", share)}
        errorMessage={errors.share?.errorMessage}
        hasError={errors.share?.hasError}
        {...getOverrideProps(overrides, "share")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
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
              preflopAction,
              preflopHeroRange,
              preflopVillainRange,
              flopNotes,
              flopAction,
              flopHeroRange,
              flopVillainRange,
              turnNotes,
              turnAction,
              turnHeroRange,
              turnVillainRange,
              riverNotes,
              riverAction,
              riverHeroRange,
              flopCards_1,
              flopCards_3,
              flopCards_2,
              turnCard,
              riverCard,
              villainPosition,
              riverVillainRange,
              stake,
              share,
              description: value,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
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
