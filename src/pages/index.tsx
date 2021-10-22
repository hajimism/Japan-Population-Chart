import axios from 'axios'
import Highcharts from 'highcharts'
import Head from 'next/head'
import React, { useState } from 'react'

import { useResas } from '@/hooks/useResas'

import { Chart } from '@/components/Chart'
import { Prefectures } from '@/components/Prefectures'
import { Spinner } from '@/components/Spinner'

import type { Prefecture } from '@/types/Prefecture'
import type { NextPage } from 'next'

import styles from '@/styles/Home.module.css'

import { getPopulationData } from '@/utils/getPopulationData'

const Home: NextPage = () => {
  const [series, setSeries] = useState<
    Highcharts.SeriesOptionsType[] | never[]
  >([])
  const { result } = useResas<Prefecture[]>('api/v1/prefectures')

  const addSeries = (prefCode: number, prefName: string) => {
    getPopulationData(prefCode, prefName).then((newData) => {
      if (series) {
        setSeries([...series, newData])
      } else {
        setSeries([newData])
      }
    })
  }

  const deleteSeries = (prefCode: number, prefName: string) => {}

  if (!result) return <Spinner />

  return (
    <>
      <Head>
        <title>都道府県別人口推移</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🇯🇵</text></svg>"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>都道府県別人口推移</h1>
        <Prefectures prefList={result} on={addSeries} off={deleteSeries} />
        <Chart series={series} />
      </main>
    </>
  )
}

export default Home
