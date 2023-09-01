import { useParametrsByPatient } from "@/hooks/useParametrsByPatient";
import { useSympromsByParametrId } from "@/hooks/useSympromsByParametrId";
import { useArea } from "@/hooks/useArea";

import lexer from '../logic/lexer';
import parseTerm from '../logic/parser';

import { metaconjunction, metadisjunction, metanegation } from "./operations";
import { explanationSymptom, explanationSolveForArea, explanationMetaoperation } from "./explanation";

const result = async (patientId) => {
  const parametrs = await getParametrsByPatient(patientId);
  const symptoms = await getSymptoms(parametrs);
  const areas = await getAreas();
  areas.forEach(area => {
    const { status, explanation } = getAnswerForArea(symptoms, area);
    area["status"] = status;
    area["explanation"] = explanation;
    area["answer"] = explanationSolveForArea(area["status"], area.name_area);
  });
  return areas;
}

const getParametrsByPatient = async (id) => {
  const response = await useParametrsByPatient(id);
  return response.paramsList._rawValue.data;
}

const getSymptoms = async (parametrs) => {
  const symptoms = {};
  for (const parametr of parametrs) {
    const response = await useSympromsByParametrId(parametr.id_parametr);
    const data = response.symptomList._rawValue.data;
    data.forEach(symptom => {
      const { range_end_symptom, range_start_symptom } = symptom;
      const { exactly_parametr, value_parametr } = parametr;
      const status = getSymptomStatus(range_end_symptom, range_start_symptom, exactly_parametr, value_parametr);
      symptom['status'] = status;
      symptoms[`s${symptom.id_symptom}`] = symptom;
    });
  };
  return symptoms;
}

const getSymptomStatus = (end, start, exactly, value) => {
  const endN = Number(end),
    startN = Number(start),
    valueN = Number(value),
    exactlyN = Number(exactly);
  if (exactlyN === 3) return "4";
  if (exactlyN === 2) {
    return (valueN >= startN && valueN <= endN) ? "6" : "5"; 
  }
  if (exactlyN === 1) {
    return (valueN >= startN && valueN <= endN) ? "2" : "1"; 
  }
  if (exactlyN === 0) {
    return "0";
  }
}

const getAnswerForArea = (symptoms, area) => {
  let lexemes = parse(area.formula_area);
  let term = parseTerm(lexemes);
  solveFormula(symptoms, term);
  return {
    "status": term.status,
    "explanation": term.explanation
  };
}

const solveFormula = (symptoms, term) => {
  const type = term.type.trim();
  if (type !== 'LITERAL') {
    solveFormula(symptoms, term.left);
    solveFormula(symptoms, term.right);
    metaoperation(type, term);
  } else {
    const symptom = term.literal.value;
    const statusTerm = symptoms[symptom].status;
    const status = defineStatusSymptomWithExplanation(statusTerm, term, symptoms[symptom].name_symptom);
    term['status'] = status;
  }
}

const getAreas = async () => {
  return await useArea();
}

const parse = (str) => {
  const lexemes = lexer(str);
  return lexemes;
};

const metaoperation = (metaoperator, term) => {
  const setsArr = [["0"], ["1"], ["2"], ["1","2"], ["4"], ["1","4"], ["2","4"], ["1","2","4"]];
  const leftSet = setsArr[Number(term.left.status)];
  const rightSet = setsArr[Number(term.right.status)];
  const resultSet = new Set();
  leftSet.forEach(valueLeftSet => {
    rightSet.forEach(valueRightSet => {
      const resultValue = metaoperator === "&&" ? metaconjunction(valueLeftSet, valueRightSet) : metadisjunction(valueLeftSet, valueRightSet);
      resultSet.add(resultValue);
    })
  });
  let result = 0;
  resultSet.forEach(item => result += Number(item));
  term['status'] = result.toString();
  explanationMetaoperation(term);
}

const defineStatusSymptomWithExplanation = (status, term, symptom_name) => {
  let newStatus = status;
    if (term.negated && status !== "4") {
      newStatus = metanegation(status);
    }
    explanationSymptom(newStatus, term, symptom_name);
    return newStatus;
}

export default result;