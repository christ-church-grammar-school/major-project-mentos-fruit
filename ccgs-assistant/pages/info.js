import { getLayout } from '../components/layout'
import styles from "../styles/schoolinfo.module.css"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

function Info() {
    var links = [[" Academic achievements February 2, 2018 ", "https://docs.ccgs.wa.edu.au/document/academic-achievements/"],[" Alcohol and drugs Policy August 11, 2017 ", "https://docs.ccgs.wa.edu.au/document/alcohol-and-drugs/"],[" An ‘Allergy Aware’ school Guidelines August 22, 2017 ", "https://docs.ccgs.wa.edu.au/document/an-allergy-aware-school/"],[" Anaphylaxis management policy Policy August 22, 2017 ", "https://docs.ccgs.wa.edu.au/document/anaphylaxis-management-policy/"],[" Asthma policy Policy August 22, 2017 ", "https://docs.ccgs.wa.edu.au/document/asthma-policy/"],[" Attendance terminal June 27, 2019 ", "https://docs.ccgs.wa.edu.au/document/attendance-terminal/"],[" Catering policy May 8, 2019 ", "https://docs.ccgs.wa.edu.au/document/catering-policy/"],[" Child protection policy Child SafePolicy August 23, 2017 ", "https://docs.ccgs.wa.edu.au/document/child-protection-policy/"],[" Child Protection Procedures Child SafeProcedures October 9, 2019 ", "https://docs.ccgs.wa.edu.au/document/child-protection-procedures/"],[" Child Safety and Well-being (Draft) Child SafePolicy April 18, 2019 ", "https://docs.ccgs.wa.edu.au/document/child-safe-draft/"],[" Code of conduct Child Safe September 20, 2017 ", "https://docs.ccgs.wa.edu.au/document/code-of-conduct/"],[" Complaints policy and procedures Child SafePolicyProcedures August 23, 2017 ", "https://docs.ccgs.wa.edu.au/document/complaints-policy-and-procedures/"],[" Complaints policy and procedures (draft) February 13, 2020 ", "https://docs.ccgs.wa.edu.au/document/complaints-policy-and-procedures-2/"],[" COVID19 Testing and Isolation May 19, 2020 ", "https://docs.ccgs.wa.edu.au/document/covid19-testing/"],[" Curriculum Policy August 24, 2017 ", "https://docs.ccgs.wa.edu.au/document/curriculum-policy/"],[" Dealing with blood and other body fluids guidelines Guidelines August 22, 2017 ", "https://docs.ccgs.wa.edu.au/document/dealing-with-blood-and-other-body-fluids-guidelines/"],[" Emergency Management Procedures for Visiting Organisations Procedures August 28, 2017 ", "https://docs.ccgs.wa.edu.au/document/emergency-management-procedures-for-visiting-organisations/"],[" Film and television viewing Policy August 29, 2017 ", "https://docs.ccgs.wa.edu.au/document/film-and-television-viewing-policy/"],[" Gifted and talented students Guidelines August 23, 2017 ", "https://docs.ccgs.wa.edu.au/document/gifted-and-talented-students/"],[" Gym and pool use February 1, 2018 ", "https://docs.ccgs.wa.edu.au/document/gym-and-pool-use/"],[" Head lice management policy Policy August 24, 2017 ", "https://docs.ccgs.wa.edu.au/document/head-lice-management-policy/"],[" Homework and study Guidelines August 28, 2017 ", "https://docs.ccgs.wa.edu.au/document/homework-and-study-guideline/"],[" House activities February 1, 2018 ", "https://docs.ccgs.wa.edu.au/document/house-activities/"],[" ICT acceptable use and electronic communications (student) Child SafeGuidelinesPolicy August 28, 2017 ", "https://docs.ccgs.wa.edu.au/document/ict-acceptable-use-and-electronic-communications-student/"],[" Library February 2, 2018 ", "https://docs.ccgs.wa.edu.au/document/senior-library/"],[" Literacy Policy August 28, 2017 ", "https://docs.ccgs.wa.edu.au/document/literacy-policy/"],[" Management of head and concussion injuries Child SafeProcedures September 11, 2018 ", "https://docs.ccgs.wa.edu.au/document/management-of-head-and-concussion-injuries/"],[" Management of head injuries Child SafePolicy August 24, 2017 ", "https://docs.ccgs.wa.edu.au/document/management-of-head-injuries/"],[" Managing student behaviour Guidelines August 28, 2017 ", "https://docs.ccgs.wa.edu.au/document/managing-student-behaviour/"],[" Managing student behaviour (remote learning) March 26, 2020 ", "https://docs.ccgs.wa.edu.au/document/managing-student-behaviour-remote-learning/"],[" Managing Student Behaviour Guidelines (remote learning) March 26, 2020 ", "https://docs.ccgs.wa.edu.au/document/managing-student-behaviour-guidelines-remote-learning/"],[" Monitoring course progress of international students Policy August 28, 2017 ", "https://docs.ccgs.wa.edu.au/document/monitoring-course-progress-of-international-students/"],[" Music meetings and rehearsal times February 2, 2018 ", "https://docs.ccgs.wa.edu.au/document/music-meetings-and-rehearsal-times/"],[" Parent Code of Conduct Code of Conduct May 3, 2019 ", "https://docs.ccgs.wa.edu.au/document/parent-code-of-conduct/"],[" Pedagogy February 1, 2018 ", "https://docs.ccgs.wa.edu.au/document/pedagogy/"],[" Preparatory School – Managing Student Behaviour Guidelines (remote learning) March 30, 2020 ", "https://docs.ccgs.wa.edu.au/document/preparatory-school-managing-student-behaviour-guidelines-remote-learning/"],[" Preparatory School rules and guidelines Guidelines August 29, 2017 ", "https://docs.ccgs.wa.edu.au/document/preparatory-school-rules-and-guidelines/"],[" Privacy policy Policy August 29, 2017 ", "https://docs.ccgs.wa.edu.au/document/privacy-policy/"],[" Protective Behaviours Curriculum Policy Child Safe November 8, 2018 ", "https://docs.ccgs.wa.edu.au/document/protective-behaviours-curriculum-policy/"],[" Public speaking guidelines February 2, 2018 ", "https://docs.ccgs.wa.edu.au/document/public-speaking-guidelines/"],[" Reporting and assessment August 29, 2017 ", "https://docs.ccgs.wa.edu.au/document/reporting-assessment/"],[" Rewarding academic achievement and endeavour Policy August 29, 2017 ", "https://docs.ccgs.wa.edu.au/document/rewarding-academic-achievement-and-endeavour/"],[" School absence and organisation Diary September 15, 2017 ", "https://docs.ccgs.wa.edu.au/document/school-absence-organisation-and-rules/"],[" School hymn and War cry February 2, 2018 ", "https://docs.ccgs.wa.edu.au/document/school-hymn-and-war-cry/"],[" School mouth guard policy Policy August 29, 2017 ", "https://docs.ccgs.wa.edu.au/document/school-mouth-guard-policy/"],[" School tours – Notes on planning your tour Guidelines August 29, 2017 ", "https://docs.ccgs.wa.edu.au/document/school-tours-notes-on-planning-your-tour/"],[" Sport procedures and venues February 2, 2018 ", "https://docs.ccgs.wa.edu.au/document/sport-procedures-and-venues/"],[" Sports bus Policy August 31, 2017 ", "https://docs.ccgs.wa.edu.au/document/sports-bus/"],[" Staff Code of Conduct (draft) Child SafeCode of Conduct November 1, 2019 ", "https://docs.ccgs.wa.edu.au/document/staff-code-of-conduct-draft/"],[" Statement of commitment to child safety (Draft) Child Safe April 18, 2019 ", "https://docs.ccgs.wa.edu.au/document/commitment-to-child-safety-draft/"],[" Student Code of Conduct Child Safe August 23, 2018 ", "https://docs.ccgs.wa.edu.au/document/student-code-of-conduct/"],[" Student illness February 2, 2018 ", "https://docs.ccgs.wa.edu.au/document/student-illness/"],[" Student presentation and uniforms February 2, 2018 ", "https://docs.ccgs.wa.edu.au/document/student-presentation-and-uniforms/"],[" Student_Participation_Agreement_iPad July 22, 2020 ", "https://docs.ccgs.wa.edu.au/document/student_participation_agreement_ipad/"],[" Students with additional needs Child SafePolicyProcedures August 31, 2017 ", "https://docs.ccgs.wa.edu.au/document/students-with-additional-needs/"],[" Sun protection policy November 14, 2017 ", "https://docs.ccgs.wa.edu.au/document/sun-protection-policy/"],[" Supporting positive relationships – addressing bullying and harrassment Child SafePolicyProcedures August 31, 2017 ", "https://docs.ccgs.wa.edu.au/document/supporting-positive-relationships-addressing-bullying-and-harrassment/"],[" Supporting positive relationships – addressing bullying and harrassment (draft) November 11, 2019 ", "https://docs.ccgs.wa.edu.au/document/supporting-positive-relationships-addressing-bullying-and-harrassment-draft/"],[" Traffic management August 31, 2017 ", "https://docs.ccgs.wa.edu.au/document/traffic-management/"],[" Video Surveillance Policy April 10, 2018 ", "https://docs.ccgs.wa.edu.au/document/video-surveillance-policy/"],[" What to do if…? February 2, 2018 ", "https://docs.ccgs.wa.edu.au/document/what-to-do-if/"],[" Whistleblower policy and procedures February 13, 2020 ", "https://docs.ccgs.wa.edu.au/document/whistleblower-policy-and-procedures/"]]

    return (
        <>
            <h1 className={styles.heading}>
                School Information
            </h1>
            <p className={styles.text}>
                Here, you will find school documents such as the code of conduct, Acceptable use of ICT policy, etc.
            </p>
            {/*<div className={styles.docLinks}>
                {links.map((el) => 
                    <><a href={el[1] + 'pdf/'} target="blank"><motion.button whileHover={{ scale: 1.05 }}whileTap={{ scale: 0.95 }} className={styles.docLink}>{el[0]}</motion.button></a><br/></>
                )}
            </div>*/}
            <div className={styles.docLinks}>
                <thead className={styles.tableLinks}>
                    <tr>
                        <th className={[styles.tableHead, styles.left].join(' ')}>Document</th>
                        <th className={styles.tableHead}>Category</th>
                        <th className={[styles.tableHead, styles.right].join(' ')}>Date</th>
                    </tr>
                    {links.map((el) => 
                        <tr key={el[1]}>
                        <td><motion.button className={styles.docLink}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.open(el[1] + 'pdf/', "_blank")}
                        >{el[0]}</motion.button></td>
                        <td className={styles.type}>Category type</td>
                        <td className={styles.type}>changed on</td>
                        </tr>
                    )}
                </thead>
            </div>
        </>
    )
}

Info.getLayout = getLayout

export default Info