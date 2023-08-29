import { useParametrsByPatient } from "@/hooks/useParametrsByPatient";
import { useSympromsByParametrId } from "@/hooks/useSympromsByParametrId";
import { useArea } from "@/hooks/useArea";

import lexer from '../logic/lexer';
import parseTerm from '../logic/parser';

const result = async (patientId) => {
  const parametrs = await getParametrsByPatient(patientId);
  const symptoms = await getSymptoms(parametrs);
  const areas = await getAreas();
  areas.forEach(area => {
    const solve = getAnswerForArea(symptoms, area)
    area["solve"] = solve;
    area["answer"] = translateSolve(solve, area.name_area);
  });
  return areas;
}

const getParametrsByPatient = async (id) => {
  const response = await useParametrsByPatient(id);
  return response.paramsList._rawValue.data;
}

const getSymptoms = async (parametrs) => {
  const symptoms = {};
  parametrs.forEach(async (parametr) => {
    const response = await useSympromsByParametrId(parametr.id_parametr);
    const data = response.symptomList._rawValue.data;
    data.forEach(symptom => {
      const { range_end_symptom, range_start_symptom } = symptom;
      const { exactly_parametr, value_parametr } = parametr;
      const status = getSymptomStatus(range_end_symptom, range_start_symptom, exactly_parametr, value_parametr);
      symptom['status'] = status;
      symptoms[`s${symptom.id_symptom}`] = symptom
    });
  });
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
  if (exactlyN === 1 || exactlyN === 0) {
    if (valueN === '-') return '0';
    return (valueN >= startN && valueN <= endN) ? "2" : "1"; 
  }
}

const getAnswerForArea = (symptoms, area) => {
  let lexemes = parse(area.formula_area);
  let term = parseTerm(lexemes);
  const solve = solveFormula(symptoms, term);
  return solve;
}

const solveFormula = (symptoms, term) => {
  const type = term.type.trim();
  if (type !== 'LITERAL') {
    term.left = solveFormula(symptoms, term.left);
    term.right = solveFormula(symptoms, term.right);
    return operation(type, term.left, term.right);
  } else {
    const symptom = term.literal.value;
    if (term.negated && symptoms[symptom].status !== "4") {
      return symptoms[symptom].status === "1" ? "2" : "1";
    }
    return symptoms[symptom].status;
  }
}

const getAreas = async () => {
  return await useArea();
}

const parse = (str) => {
  const lexemes = lexer(str);
  return lexemes;
};

const operation = (operator, left, right) => {
  console.log("OPERATION");
  console.log(left, right);
  return operator === "&&" ? metaconjunction(left, right) : metadisjunction(left, right);
}

const metaconjunction = (left, right) => {
  //TODO сделать фунцию для всех возможных случаев
  const conjuction = {
    "11": "1",
    "12": "1",
    "14": "1",
    "21": "1",
    "22": "2",
    "24": "4",
    "41": "1",
    "42": "4",
    "44": "4"
  };
  return conjuction[`${left}${right}`];
}

const metadisjunction = (left, right) => {
  //TODO сделать фунцию для всех возможных случаев
  const disjunction = {
    "11": "1",
    "12": "2",
    "14": "4",
    "21": "2",
    "22": "2",
    "24": "2",
    "41": "4",
    "42": "2",
    "44": "2"
  };
  return disjunction[`${left}${right}`];
}

const translateSolve = (solve, name) => {
  const model = {
    "0": `Для области ${name} эксперт не достаточно квалифицирован`,
    "1": `Область ${name} не подходит по симптомам`,
    "2": `Область ${name} подходит по симптомам`,
    "3": `Из-за противоречия эксперта и машины невозможно точно определить состояние области ${name}`,
    "4": `Невозможно определить состояние области ${name}, так как не для всех симптомов имеется информация`,
    "5": `Основываясь на опыте эксперта можно сказать, что область ${name} не подходит`,
    "6": `Основываясь на опыте эксперта можно сказать, что область ${name} подходит`,
    "7": `Для более точного определения состояния область ${name} необходимы уточнения в симптомах`
  }
  return model[solve];
}

export default result;