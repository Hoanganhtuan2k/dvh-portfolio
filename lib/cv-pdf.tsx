import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  PERSON,
  EXPERIENCE,
  SKILLS,
  PROJECTS,
} from "./constants";

/**
 * ATS-friendly classic CV.
 *  - Built-in Helvetica fonts only (no remote font fetches).
 *  - Single-column, plain layout, generous whitespace.
 *  - All copy is sourced from `lib/constants.ts`.
 *
 * Regenerate `public/Dao_Viet_Hoang_CV.pdf` via:  npm run build:cv
 */

const COLORS = {
  text: "#111111",
  muted: "#555555",
  faint: "#888888",
  accent: "#0a6fa3",
  rule: "#cccccc",
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 48,
    paddingVertical: 44,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.45,
  },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", letterSpacing: 0.5 },
  role: {
    marginTop: 3,
    fontSize: 11,
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
  },
  contactRow: { marginTop: 8, fontSize: 9.5, color: COLORS.muted },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
    color: COLORS.accent,
    textTransform: "uppercase",
    borderBottomWidth: 0.7,
    borderBottomColor: COLORS.rule,
    paddingBottom: 4,
  },
  summary: { fontSize: 10, color: COLORS.text, lineHeight: 1.5 },
  entry: { marginBottom: 10 },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  entryRole: { fontSize: 10.5, fontFamily: "Helvetica-Bold" },
  entryWhen: { fontSize: 9, color: COLORS.muted },
  entryOrg: {
    fontSize: 9.5,
    color: COLORS.muted,
    fontStyle: "italic",
    marginTop: 1,
  },
  entrySummary: { marginTop: 3, fontSize: 9.5, color: COLORS.text },
  bullet: { flexDirection: "row", marginTop: 2, paddingLeft: 6 },
  bulletDot: { width: 8, fontSize: 9.5, color: COLORS.muted },
  bulletText: { flex: 1, fontSize: 9.5, color: COLORS.text, lineHeight: 1.45 },
  techRow: {
    marginTop: 4,
    fontSize: 8.5,
    color: COLORS.faint,
    letterSpacing: 0.4,
  },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillLabel: { width: 110, fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  skillItems: { flex: 1, fontSize: 9.5, color: COLORS.text },
  projectEntry: { marginBottom: 8 },
  projectTitle: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  projectMeta: { fontSize: 9, color: COLORS.muted, marginTop: 1 },
  projectDesc: {
    fontSize: 9.5,
    color: COLORS.text,
    marginTop: 2,
    lineHeight: 1.45,
  },
});

export function CvDocument() {
  const work = EXPERIENCE.filter((e) => !e.edu);
  const edu = EXPERIENCE.filter((e) => e.edu);
  const projects = PROJECTS.slice(0, 4);

  return (
    <Document
      title={`${PERSON.name} — Resume`}
      author={PERSON.name}
      subject="Resume"
      creator="dvh.dev portfolio"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{PERSON.name}</Text>
        <Text style={styles.role}>{PERSON.role}</Text>
        <Text style={styles.contactRow}>
          {`${PERSON.location}  ·  ${PERSON.phone}  ·  ${PERSON.email}  ·  ${PERSON.linkedin}`}
        </Text>

        {/* Summary */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summary}>{PERSON.summary}</Text>

        {/* Experience */}
        <Text style={styles.sectionTitle}>Experience</Text>
        {work.map((e, i) => (
          <View key={i} style={styles.entry} wrap={false}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryRole}>{e.role}</Text>
              <Text style={styles.entryWhen}>{e.when}</Text>
            </View>
            <Text style={styles.entryOrg}>{e.org}</Text>
            {e.summary ? (
              <Text style={styles.entrySummary}>{e.summary}</Text>
            ) : null}
            {e.bullets.map((b, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{b}</Text>
              </View>
            ))}
            {e.tech.length > 0 ? (
              <Text style={styles.techRow}>{e.tech.join("  ·  ")}</Text>
            ) : null}
          </View>
        ))}

        {/* Education */}
        <Text style={styles.sectionTitle}>Education</Text>
        {edu.map((e, i) => (
          <View key={i} style={styles.entry} wrap={false}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryRole}>{e.role}</Text>
              <Text style={styles.entryWhen}>{e.when}</Text>
            </View>
            <Text style={styles.entryOrg}>{e.org}</Text>
            {e.summary ? (
              <Text style={styles.entrySummary}>{e.summary}</Text>
            ) : null}
            {e.bullets.map((b, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{b}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        {SKILLS.map((s) => (
          <View key={s.title} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{s.title}</Text>
            <Text style={styles.skillItems}>{s.items.join(", ")}</Text>
          </View>
        ))}

        {/* Selected Projects */}
        <Text style={styles.sectionTitle}>Selected Projects</Text>
        {projects.map((p) => (
          <View key={p.id} style={styles.projectEntry} wrap={false}>
            <View style={styles.entryHeader}>
              <Text style={styles.projectTitle}>{p.title}</Text>
              {p.when ? <Text style={styles.entryWhen}>{p.when}</Text> : null}
            </View>
            {p.scope ? (
              <Text style={styles.projectMeta}>{p.scope}</Text>
            ) : null}
            <Text style={styles.projectDesc}>{p.description}</Text>
            <Text style={styles.techRow}>{p.tech.join("  ·  ")}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
