/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { PortfolioData } from "@/data/portfolioData";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 36,
    fontSize: 9,
    color: "#000000",
    lineHeight: 1.3,
  },
  // Centered Header — properly structured to eliminate any vertical overlap
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    paddingBottom: 4,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#000000",
    lineHeight: 1.2,
    marginBottom: 6,
    textAlign: "center",
  },
  title: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#000000",
    lineHeight: 1.2,
    marginBottom: 6,
    textAlign: "center",
  },
  contactLine: {
    fontSize: 8.8,
    color: "#000000",
    lineHeight: 1.2,
    textAlign: "center",
  },
  contactLink: {
    color: "#0000ee",
    textDecoration: "underline",
  },

  // Section Headers
  sectionContainer: {
    marginTop: 6,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
    marginBottom: 2,
  },
  sectionTitleUpper: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginBottom: 5,
  },

  // Objective
  objectiveText: {
    fontSize: 8.8,
    color: "#111111",
    lineHeight: 1.34,
    marginBottom: 4,
    textAlign: "justify",
  },

  // Bullet Items
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletPoint: {
    width: 9,
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
  },

  // Indented Project Box
  projectSubBlock: {
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 8.4,
    color: "#111111",
    lineHeight: 1.32,
    marginBottom: 3,
    textAlign: "justify",
  },
  projectSubHeading: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
    marginTop: 2,
    marginBottom: 1,
  },
  projectTechLine: {
    fontSize: 8.3,
    color: "#111111",
    lineHeight: 1.28,
  },

  // Experience & Education Row Blocks
  itemBlock: {
    marginBottom: 4,
  },
  twoColRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
  },
  orgName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
    textTransform: "uppercase",
  },
  itemDates: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
  },
  roleName: {
    fontSize: 8.6,
    fontFamily: "Helvetica-Bold",
    color: "#222222",
    marginBottom: 1,
  },
  subDetailText: {
    fontSize: 8.3,
    color: "#333333",
    lineHeight: 1.28,
    marginLeft: 6,
  },

  // Skills Line
  skillLine: {
    flexDirection: "row",
    marginBottom: 2.5,
  },
  skillCategoryTitle: {
    fontSize: 8.7,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
  },
  skillItemsText: {
    fontSize: 8.7,
    fontFamily: "Helvetica",
    color: "#111111",
  },
});

interface ResumeDocumentProps {
  data: PortfolioData;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data }) => {
  const { personal } = data;

  return (
    <Document
      title={`${personal.name} - Resume`}
      author={personal.name}
      subject="Software Engineer Resume"
      keywords="Software Engineer, Full-Stack Developer, Next.js, React, Node.js, POS System"
    >
      <Page size="A4" style={styles.page}>
        {/* ================= 1. HEADER (CENTERED, STRICT VERTICAL SEPARATION) ================= */}
        <View style={styles.header}>
          <View style={{ marginBottom: 4 }}>
            <Text style={styles.name}>{personal.name}</Text>
          </View>
          <View style={{ marginBottom: 4 }}>
            <Text style={styles.title}>SOFTWARE ENGINEER</Text>
          </View>
          <View>
            <Text style={styles.contactLine}>
              {personal.location} | {personal.phone} |{" "}
              <Link src={`mailto:${personal.email}`} style={styles.contactLink}>
                {personal.email}
              </Link>
            </Text>
          </View>
        </View>

        {/* ================= 2. OBJECTIVE ================= */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Objective</Text>
          <View style={styles.horizontalRule} />
        </View>
        <Text style={styles.objectiveText}>
          As a motivated Software Engineer and Full-Stack Developer with a strong foundation in C#, Object-Oriented Programming (OOP), and programming fundamentals, I am eager to contribute to your team and continue growing as a software developer. I have hands-on experience in building scalable web applications using React.js, Next.js, and TypeScript, backend development with Node.js, Laravel, REST APIs, and software automation systems.
        </Text>
        <Text style={styles.objectiveText}>
          I am passionate about learning new technologies, building clean and user-friendly web applications, and working in a collaborative environment where I can improve my skills and contribute positively to projects.
        </Text>

        {/* ================= 3. PROFESSIONAL EXPERIENCE / INTERNSHIPS ================= */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitleUpper}>EXPERIENCE &amp; INTERNSHIPS</Text>
          <View style={styles.horizontalRule} />
        </View>

        <View style={styles.itemBlock}>
          <View style={styles.twoColRow}>
            <Text style={styles.orgName}>REVIVE MEDICAL TECHNOLOGIES</Text>
            <Text style={styles.itemDates}>2026 – Present</Text>
          </View>
          <Text style={styles.roleName}>Software Department Intern</Text>
          <Text style={styles.subDetailText}>
            • Working in the Software Department on software automation systems, automated API test suites, medical technology applications, and high-reliability full-stack web solutions.
          </Text>
        </View>

        <View style={styles.itemBlock}>
          <View style={styles.twoColRow}>
            <Text style={styles.orgName}>PIG BUG SOLUTION</Text>
            <Text style={styles.itemDates}>2026 (6 Weeks)</Text>
          </View>
          <Text style={styles.roleName}>Web Developer Intern</Text>
          <Text style={styles.subDetailText}>
            • Developed responsive web user interfaces and integrated backend REST APIs using Next.js, React, TypeScript, and Tailwind CSS with automated build optimization.
          </Text>
        </View>

        {/* ================= 4. PROJECTS ================= */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitleUpper}>PROJECTS</Text>
          <View style={styles.horizontalRule} />
        </View>

        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>SaaS Multi-Tenant Automation Platform</Text>
        </View>

        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>Ahmed Mobile — E-Commerce Web Store</Text>
        </View>

        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>NetPrime — Video Streaming Platform</Text>
        </View>

        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>COVID / Health Statistics Visualizer</Text>
        </View>

        {/* Featured Detailed Project: Cloud-Based Multi-Store POS */}
        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>Cloud-Based Multi-Store POS &amp; Inventory Management System</Text>
        </View>

        <View style={styles.projectSubBlock}>
          <Text style={styles.projectDescription}>
            (A comprehensive multi-location cloud-based Point of Sale (POS) and inventory management Progressive Web Application designed for enterprise retail businesses. The system enables real-time inventory tracking across multiple branch stores with automated background synchronization, barcode scanning, offline transaction processing, staff role-based access control, receipt generation, and automated daily/monthly financial analytics. It allows store managers to manage suppliers, purchase orders, customer ledgers, and cash registers with automated low-stock threshold alerts.
          </Text>
          <Text style={styles.projectSubHeading}>For development, we used:</Text>
          <Text style={styles.projectTechLine}>Next.js, React.js, TypeScript, and Tailwind CSS for the frontend</Text>
          <Text style={styles.projectTechLine}>Laravel &amp; Node.js RESTful APIs for backend and transaction services</Text>
          <Text style={styles.projectTechLine}>PostgreSQL and MySQL for database &amp; multi-branch ledger synchronization</Text>
          <Text style={styles.projectTechLine}>Offline PWA Service Workers with IndexedDB for offline resilience</Text>
          <Text style={styles.projectTechLine}>Multiple APIs for automated reporting and barcode generation)</Text>
        </View>

        {/* ================= 5. EDUCATION ================= */}
        <View style={styles.sectionContainer}>
          <View style={styles.twoColRow}>
            <Text style={styles.orgName}>FOUNDATION UNIVERSITY ISLAMABAD, BSc (IET)</Text>
            <Text style={styles.itemDates}>09/2023 – 2027</Text>
          </View>
          <Text style={{ fontSize: 8.5, fontFamily: "Helvetica", color: "#222222", marginBottom: 3 }}>
            Bachelor of Science in Information Engineering Technology
          </Text>

          <View style={styles.twoColRow}>
            <Text style={styles.orgName}>ASKARIA COLLEGE BOYS SADDAR RAWALPINDI</Text>
            <Text style={styles.itemDates}>04/2021 – 06/2022</Text>
          </View>
          <Text style={{ fontSize: 8.5, fontFamily: "Helvetica", color: "#222222" }}>
            ICS (Intermediate in Computer Science)
          </Text>
        </View>

        {/* ================= 6. SKILLS & ABILITIES ================= */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Skills &amp; abilities</Text>
          <View style={styles.horizontalRule} />

          <View style={styles.skillLine}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.skillItemsText}>
              <Text style={styles.skillCategoryTitle}>Backend Technologies: </Text>
              Node.js, Express, Laravel, REST APIs, PHP, C#
            </Text>
          </View>

          <View style={styles.skillLine}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.skillItemsText}>
              <Text style={styles.skillCategoryTitle}>Frontend Technologies: </Text>
              React.js, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
            </Text>
          </View>

          <View style={styles.skillLine}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.skillItemsText}>
              <Text style={styles.skillCategoryTitle}>Database &amp; Cloud: </Text>
              MS SQL Server, MySQL, Firebase, PostgreSQL, MongoDB, Render
            </Text>
          </View>

          <View style={styles.skillLine}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.skillItemsText}>
              <Text style={styles.skillCategoryTitle}>Programming Languages: </Text>
              TypeScript, JavaScript, C#, C++, Java, Python
            </Text>
          </View>

          <View style={styles.skillLine}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.skillItemsText}>
              <Text style={styles.skillCategoryTitle}>Soft Skills: </Text>
              Analytical Thinking, Problem Solving, Team Collaboration, Adaptability, Time Management
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
