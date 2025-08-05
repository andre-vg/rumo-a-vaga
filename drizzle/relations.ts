import { relations } from "drizzle-orm/relations";
import { subjectInRumoAVaga, studyInRumoAVaga } from "./schema";

export const studyInRumoAVagaRelations = relations(studyInRumoAVaga, ({one}) => ({
	subjectInRumoAVaga: one(subjectInRumoAVaga, {
		fields: [studyInRumoAVaga.subjectId],
		references: [subjectInRumoAVaga.id]
	}),
}));

export const subjectInRumoAVagaRelations = relations(subjectInRumoAVaga, ({many}) => ({
	studyInRumoAVagas: many(studyInRumoAVaga),
}));