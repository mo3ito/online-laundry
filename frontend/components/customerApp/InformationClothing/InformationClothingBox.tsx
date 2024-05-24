import React from 'react'
import InformationClothingsItem from './InformationClothingsItem'

export default function InformationClothingBox() {
  return (
    <main className="px-8">
    <section>
      <ul className="w-full  ">
        <InformationClothingsItem />
        <InformationClothingsItem />
        <InformationClothingsItem />
        <InformationClothingsItem />
        <InformationClothingsItem />
        <InformationClothingsItem />
      </ul>
    </section>
  </main>
  )
}
