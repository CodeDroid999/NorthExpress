import { UserAuth } from 'context/AuthContext'
import { db } from '../../firebase'
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'


const SkillsAndEducation = () => {
  const { user } = UserAuth()

  const [newSkill, setNewSkill] = useState('')
  const [newEducation, setNewEducation] = useState('')
  const [customSkillError, setCustomSkillError] = useState('')
  const [educationError, setEducationError] = useState('')

  const addSkill = async (skill: string) => {
    let hasError = false
    if (!skill) {
      setCustomSkillError('Field can not be empty')
      hasError = true
    }
    if (hasError) {
      return
    }
    if (!user?.skills.includes(skill)) {
      const q = query(
        collection(db, 'users'),
        where('userId', '==', user?.userId)
      )
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]
        const userDocRef = doc(db, 'users', docSnapshot.id)
        await updateDoc(userDocRef, {
          skills: arrayUnion(skill),
        })
      }
      setNewSkill('')
      setCustomSkillError('')
      toast.success('Skill added')
    } else {
      setCustomSkillError('Skill already added')
    }
  }

  const removeSkill = async (skill: string) => {
    const q = query(
      collection(db, 'users'),
      where('userId', '==', user?.userId)
    )
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        skills: arrayRemove(skill),
      })
      toast.success('Skill removed')
      setCustomSkillError('')
    }
  }

  const addEducation = async (edu: string) => {
    let hasError = false
    if (!edu) {
      setEducationError('Field can not be empty')
      hasError = true
    }
    if (hasError) {
      return
    }
    if (!user?.skills.includes(edu)) {
      const q = query(
        collection(db, 'users'),
        where('userId', '==', user?.userId)
      )
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]
        const userDocRef = doc(db, 'users', docSnapshot.id)
        await updateDoc(userDocRef, {
          education: arrayUnion(edu),
        })
      }
      setNewEducation('')
      setEducationError('')
      toast.success('Education added')
    } else {
      setEducationError('Education already added')
    }
  }

  const removeEducation = async (edu: string) => {
    const q = query(
      collection(db, 'users'),
      where('userId', '==', user?.userId)
    )
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        education: arrayRemove(edu),
      })
      toast.success('Education removed')
      setEducationError('')
    }
  }

  return (
    <div className="w-full rounded bg-blue-100 p-4">
      <div>
        <h3 className="text-2xl font-medium text-green-950">
          Skills & Education
        </h3>
        <p className="pb-1 pt-4 font-medium text-green-950">Skills</p>

        <div className="flex flex-wrap rounded bg-white">
          {user?.skills.map((skill, index) => (
            <div
              key={index}
              className="m-1 flex flex-row items-center rounded-lg bg-gray-500 px-2 py-1 text-white"
            >
              <span className="mr-2">{skill}</span>
              <button className="" onClick={() => removeSkill(skill)}>
                x
              </button>
            </div>
          ))}
        </div>

        <div className="my-2 flex flex-row items-center">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add skill"
            className="rounded-lg border px-2 py-1 outline-blue-950"
          />
          <button
            onClick={() => addSkill(newSkill)}
            className="ml-2 rounded-lg bg-green-400 px-2 py-1 text-white"
          >
            Add Skill
          </button>
        </div>
        {customSkillError && (
          <span className="ml-2 text-red-500">{customSkillError}</span>
        )}
      </div>

      <div>
        <h3 className="pb-1 pt-4 font-medium text-green-950">Education</h3>
        <div className="flex flex-wrap rounded bg-white">
          {user?.education.map((edu, index) => (
            <div
              key={index}
              className="m-1 flex flex-row items-center rounded-lg bg-gray-500 px-2 py-1 text-white"
            >
              <span className="mr-2">{edu}</span>
              <button className="" onClick={() => removeEducation(edu)}>
                x
              </button>
            </div>
          ))}
        </div>
        <div className="my-2 flex flex-row items-center">
          <input
            type="text"
            value={newEducation}
            onChange={(e) => setNewEducation(e.target.value)}
            placeholder="Enter education"
            className="rounded-lg border px-2 py-1 outline-blue-950"
          />
          <button
            onClick={() => addEducation(newEducation)}
            className="ml-2 rounded-lg bg-green-400 px-2 py-1 text-white"
          >
            Add Education
          </button>
        </div>
        {educationError && (
          <span className="ml-2 text-red-500">{educationError}</span>
        )}
      </div>
    </div>
  )
}

export default SkillsAndEducation
