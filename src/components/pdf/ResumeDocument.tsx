/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
import { PortfolioData } from "@/data/portfolioData";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    padding: 0,
  },
  sidebar: {
    width: "33%",
    backgroundColor: "#0f172a", // Dark Slate Blue
    color: "#f8fafc",
    padding: 20,
    flexDirection: "column",
  },
  main: {
    width: "67%",
    padding: 24,
    backgroundColor: "#ffffff",
    color: "#1e293b",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#2cb67d",
  },
  sidebarName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 4,
  },
  sidebarTitle: {
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#2cb67d", // Emerald Accent
    textAlign: "center",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sidebarSectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#2cb67d",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    paddingBottom: 4,
    marginTop: 12,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contactItem: {
    fontSize: 8.5,
    color: "#cbd5e1",
    marginBottom: 6,
    lineHeight: 1.3,
  },
  contactLabel: {
    fontFamily: "Helvetica-Bold",
    color: "#94a3b8",
    fontSize: 7.5,
    textTransform: "uppercase",
    marginBottom: 1,
  },
  link: {
    color: "#38d99a",
    textDecoration: "none",
  },
  techBadgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },
  techBadge: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 7.5,
    color: "#e2e8f0",
  },

  // Main Content Styles
  headerName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#2cb67d",
    marginBottom: 12,
  },
  mainSectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    borderBottomWidth: 2,
    borderBottomColor: "#2cb67d",
    paddingBottom: 3,
    marginTop: 12,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryText: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.5,
    marginBottom: 6,
  },

  // Item blocks
  blockItem: {
    marginBottom: 10,
  },
  blockHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  blockTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  blockSubtitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#2cb67d",
    marginBottom: 2,
  },
  blockDate: {
    fontSize: 8,
    fontFamily: "Helvetica-Oblique",
    color: "#64748b",
  },
  blockDescription: {
    fontSize: 8.5,
    color: "#475569",
    lineHeight: 1.4,
  },
  bulletPoint: {
    fontSize: 8,
    color: "#475569",
    marginLeft: 6,
    marginBottom: 2,
    lineHeight: 1.3,
  },
  projectTechList: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: "#0f766e",
    marginTop: 2,
  },
});

interface ResumeDocumentProps {
  data: PortfolioData;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data }) => {
  const {
    personal,
    technologies,
    education,
    languages,
    certifications,
    achievements,
    experience,
    projects,
  } = data;

  return (
    <Document title={`${personal.name} - Resume`} author={personal.name}>
      <Page size="A4" style={styles.page}>
        {/* LEFT SIDEBAR */}
        <View style={styles.sidebar}>
          {/* Profile Picture */}
          <View style={styles.avatarContainer}>
            <Image src={personal.profilePicture} style={styles.avatar} />
          </View>

          {/* Name & Title */}
          <Text style={styles.sidebarName}>{personal.name}</Text>
          <Text style={styles.sidebarTitle}>{personal.title}</Text>

          {/* Contact Information */}
          <Text style={styles.sidebarSectionTitle}>Contact</Text>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.contactLabel}>Email</Text>
            <Link href={`mailto:${personal.email}`} style={styles.link}>
              <Text style={styles.contactItem}>{personal.email}</Text>
            </Link>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactItem}>{personal.phone}</Text>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.contactLabel}>Location</Text>
            <Text style={styles.contactItem}>{personal.location}</Text>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.contactLabel}>GitHub</Text>
            <Link href={personal.github} style={styles.link}>
              <Text style={styles.contactItem}>github.com/ArhumAhmed143</Text>
            </Link>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.contactLabel}>LinkedIn</Text>
            <Link href={personal.linkedin} style={styles.link}>
              <Text style={styles.contactItem}>linkedin.com/in/arhum-ahmed</Text>
            </Link>
          </View>

          {personal.website && (
            <View style={{ marginBottom: 6 }}>
              <Text style={styles.contactLabel}>Featured Platform</Text>
              <Link href={personal.website} style={styles.link}>
                <Text style={styles.contactItem}>{personal.website.replace("https://", "").replace(/\/$/, "")}</Text>
              </Link>
            </View>
          )}

          {/* Key Technologies & Skills */}
          <Text style={styles.sidebarSectionTitle}>Skills & Tech</Text>
          <View style={styles.techBadgeContainer}>
            {technologies.map((tech) => (
              <Text key={tech} style={styles.techBadge}>
                {tech}
              </Text>
            ))}
          </View>

          {/* Languages */}
          <Text style={styles.sidebarSectionTitle}>Languages</Text>
          {languages.map((lang) => (
            <Text key={lang} style={styles.contactItem}>
              • {lang}
            </Text>
          ))}
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={styles.main}>
          {/* Executive Summary */}
          <Text style={styles.mainSectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{personal.summary}</Text>

          {/* Work Experience */}
          <Text style={styles.mainSectionTitle}>Experience & Journey</Text>
          {experience.map((exp, idx) => (
            <View key={idx} style={styles.blockItem}>
              <View style={styles.blockHeaderRow}>
                <Text style={styles.blockTitle}>{exp.title}</Text>
                <Text style={styles.blockDate}>{exp.period}</Text>
              </View>
              <Text style={styles.blockSubtitle}>{exp.role}</Text>
              <Text style={styles.blockDescription}>{exp.description}</Text>
            </View>
          ))}

          {/* Featured Projects */}
          <Text style={styles.mainSectionTitle}>Featured Projects</Text>
          {projects.map((proj) => (
            <View key={proj.id} style={styles.blockItem}>
              <View style={styles.blockHeaderRow}>
                <Text style={styles.blockTitle}>{proj.title}</Text>
                {proj.duration && (
                  <Text style={styles.blockDate}>{proj.duration}</Text>
                )}
              </View>
              <Text style={styles.blockDescription}>{proj.description}</Text>
              {proj.highlights.slice(0, 2).map((h, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {h}
                </Text>
              ))}
              <Text style={styles.projectTechList}>
                Stack: {proj.tags.join(" • ")}
              </Text>
              {proj.demoUrl && (
                <Link href={proj.demoUrl} style={styles.link}>
                  <Text style={{ fontSize: 7, color: "#059669", marginTop: 2 }}>
                    Live URL: {proj.demoUrl}
                  </Text>
                </Link>
              )}
            </View>
          ))}

          {/* Education */}
          <Text style={styles.mainSectionTitle}>Education</Text>
          {education.map((edu, idx) => (
            <View key={idx} style={styles.blockItem}>
              <View style={styles.blockHeaderRow}>
                <Text style={styles.blockTitle}>{edu.degree}</Text>
                <Text style={styles.blockDate}>{edu.period}</Text>
              </View>
              <Text style={styles.blockSubtitle}>{edu.institution}</Text>
              <Text style={styles.blockDescription}>{edu.details}</Text>
            </View>
          ))}

          {/* Certifications & Achievements */}
          {certifications.length > 0 && (
            <>
              <Text style={styles.mainSectionTitle}>Certifications & Achievements</Text>
              {certifications.map((cert, idx) => (
                <Text key={idx} style={styles.bulletPoint}>
                  • {cert}
                </Text>
              ))}
              {achievements.map((ach, idx) => (
                <Text key={`ach-${idx}`} style={styles.bulletPoint}>
                  • {ach}
                </Text>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};
