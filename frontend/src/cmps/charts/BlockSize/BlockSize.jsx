import { Component } from 'react'
import { LineChart } from '../../min/charts/LineChart'
// import React from 'react'
// import { Sparklines, SparklinesLine } from 'react-sparklines'

import './BlockSize.scss'
import axios from 'axios'

export class BlockSize extends Component {
  state = {
    stats: null,
  }

  async componentDidMount() {
    const stats = {
      status: 'ok',
      name: 'Average Block Size',
      unit: 'MB',
      period: 'day',
      description: 'The average block size in MB.',
      values: [
        {
          x: 1604620800,
          y: 1.2726377647058829,
        },
        {
          x: 1604707200,
          y: 1.3592373630136991,
        },
        {
          x: 1604793600,
          y: 1.3720736884057976,
        },
        {
          x: 1604880000,
          y: 1.3706877783783775,
        },
        {
          x: 1604966400,
          y: 1.22573937414966,
        },
        {
          x: 1605052800,
          y: 1.2971731700680273,
        },
        {
          x: 1605139200,
          y: 1.2476003812499998,
        },
        {
          x: 1605225600,
          y: 1.2766392949640286,
        },
        {
          x: 1605312000,
          y: 1.2901966408450702,
        },
        {
          x: 1605398400,
          y: 1.2052265199999999,
        },
        {
          x: 1605484800,
          y: 1.2089313187499997,
        },
        {
          x: 1605571200,
          y: 1.2824604331210194,
        },
        {
          x: 1605657600,
          y: 1.2620370650887565,
        },
        {
          x: 1605744000,
          y: 1.3300628175182485,
        },
        {
          x: 1605830400,
          y: 1.285111857142857,
        },
        {
          x: 1605916800,
          y: 1.1501721597633134,
        },
        {
          x: 1606003200,
          y: 0.9292092586206891,
        },
        {
          x: 1606089600,
          y: 1.2294749115646255,
        },
        {
          x: 1606176000,
          y: 1.2716093382352933,
        },
        {
          x: 1606262400,
          y: 1.233440948387097,
        },
        {
          x: 1606348800,
          y: 1.2968146333333335,
        },
        {
          x: 1606435200,
          y: 1.2851594480519473,
        },
        {
          x: 1606521600,
          y: 1.3202985974025976,
        },
        {
          x: 1606608000,
          y: 1.1048270733333336,
        },
        {
          x: 1606694400,
          y: 1.3185017699115051,
        },
        {
          x: 1606780800,
          y: 1.2771752828947374,
        },
        {
          x: 1606867200,
          y: 1.2566132061068704,
        },
        {
          x: 1606953600,
          y: 1.3102050445859874,
        },
        {
          x: 1607040000,
          y: 1.3210272569444448,
        },
        {
          x: 1607126400,
          y: 1.3423031666666674,
        },
        {
          x: 1607212800,
          y: 1.3485796470588238,
        },
        {
          x: 1607299200,
          y: 1.202576086666667,
        },
        {
          x: 1607385600,
          y: 1.2865375208333338,
        },
        {
          x: 1607472000,
          y: 1.2758179136690648,
        },
        {
          x: 1607558400,
          y: 1.3067105230769234,
        },
        {
          x: 1607644800,
          y: 1.3259370217391302,
        },
        {
          x: 1607731200,
          y: 1.296116386363636,
        },
        {
          x: 1607817600,
          y: 1.174223993589744,
        },
        {
          x: 1607904000,
          y: 1.1715791172413796,
        },
        {
          x: 1607990400,
          y: 1.2925099642857143,
        },
        {
          x: 1608076800,
          y: 1.3095326993006986,
        },
        {
          x: 1608163200,
          y: 1.2999028449612409,
        },
        {
          x: 1608249600,
          y: 1.2715359872611471,
        },
        {
          x: 1608336000,
          y: 1.2656244746835446,
        },
        {
          x: 1608422400,
          y: 1.3440260927152317,
        },
        {
          x: 1608508800,
          y: 1.3453685,
        },
        {
          x: 1608595200,
          y: 1.3020790209790214,
        },
        {
          x: 1608681600,
          y: 1.2462769350649348,
        },
        {
          x: 1608768000,
          y: 1.2701059523809528,
        },
        {
          x: 1608854400,
          y: 1.2858441805555554,
        },
        {
          x: 1608940800,
          y: 1.3848658394160587,
        },
        {
          x: 1609027200,
          y: 1.3039597297297303,
        },
        {
          x: 1609113600,
          y: 1.29663193125,
        },
        {
          x: 1609200000,
          y: 1.2766434473684216,
        },
        {
          x: 1609286400,
          y: 1.2565748895348836,
        },
        {
          x: 1609372800,
          y: 1.277365012048193,
        },
        {
          x: 1609459200,
          y: 1.352232664429529,
        },
        {
          x: 1609545600,
          y: 1.3956372450331127,
        },
        {
          x: 1609632000,
          y: 1.2886939240506328,
        },
        {
          x: 1609718400,
          y: 1.3188061907514448,
        },
        {
          x: 1609804800,
          y: 1.2927130828025464,
        },
        {
          x: 1609891200,
          y: 1.2936679209039559,
        },
        {
          x: 1609977600,
          y: 1.269546125,
        },
        {
          x: 1610064000,
          y: 1.295011067567567,
        },
        {
          x: 1610150400,
          y: 1.2609308633093523,
        },
        {
          x: 1610236800,
          y: 1.282691371069182,
        },
        {
          x: 1610323200,
          y: 1.3372514999999996,
        },
        {
          x: 1610409600,
          y: 1.3242120472972965,
        },
        {
          x: 1610496000,
          y: 1.2648656644736844,
        },
        {
          x: 1610582400,
          y: 1.2964830204081637,
        },
        {
          x: 1610668800,
          y: 1.315265806451613,
        },
        {
          x: 1610755200,
          y: 1.3197683197278909,
        },
        {
          x: 1610841600,
          y: 1.3245906842105262,
        },
        {
          x: 1610928000,
          y: 1.3425268551724134,
        },
        {
          x: 1611014400,
          y: 1.278255315436242,
        },
        {
          x: 1611100800,
          y: 1.2771157234042554,
        },
        {
          x: 1611187200,
          y: 1.3130490930232561,
        },
        {
          x: 1611273600,
          y: 1.283418816901409,
        },
        {
          x: 1611360000,
          y: 1.289703470967742,
        },
        {
          x: 1611446400,
          y: 1.3070278705035971,
        },
        {
          x: 1611532800,
          y: 1.3805250428571425,
        },
        {
          x: 1611619200,
          y: 1.360394142857143,
        },
        {
          x: 1611705600,
          y: 1.286615401408451,
        },
        {
          x: 1611792000,
          y: 1.3159464068965516,
        },
        {
          x: 1611878400,
          y: 1.313147296052631,
        },
        {
          x: 1611964800,
          y: 1.3017438382352942,
        },
        {
          x: 1612051200,
          y: 1.3109724583333329,
        },
        {
          x: 1612137600,
          y: 1.3131606749999998,
        },
        {
          x: 1612224000,
          y: 1.3008425328947373,
        },
        {
          x: 1612310400,
          y: 1.301816320000001,
        },
        {
          x: 1612396800,
          y: 1.2867745437499998,
        },
        {
          x: 1612483200,
          y: 1.3038176686390532,
        },
        {
          x: 1612569600,
          y: 1.2862396477987417,
        },
        {
          x: 1612656000,
          y: 1.3935527884615386,
        },
        {
          x: 1612742400,
          y: 1.3867732962962962,
        },
        {
          x: 1612828800,
          y: 1.2789557342657334,
        },
        {
          x: 1612915200,
          y: 1.2902988391608394,
        },
        {
          x: 1613001600,
          y: 1.2711824186046514,
        },
        {
          x: 1613088000,
          y: 1.2729824577464783,
        },
        {
          x: 1613174400,
          y: 1.3193575095541399,
        },
        {
          x: 1613260800,
          y: 1.3239068993288579,
        },
        {
          x: 1613347200,
          y: 1.3219647549668876,
        },
        {
          x: 1613433600,
          y: 1.2968272396694225,
        },
        {
          x: 1613520000,
          y: 1.2910194710144924,
        },
        {
          x: 1613606400,
          y: 1.3050502846715326,
        },
        {
          x: 1613692800,
          y: 1.328641823529411,
        },
        {
          x: 1613779200,
          y: 1.321612397260274,
        },
        {
          x: 1613865600,
          y: 1.4457590921985817,
        },
        {
          x: 1613952000,
          y: 1.3349589999999991,
        },
        {
          x: 1614038400,
          y: 1.298336511811023,
        },
        {
          x: 1614124800,
          y: 1.3099372327044028,
        },
        {
          x: 1614211200,
          y: 1.3010018846153848,
        },
        {
          x: 1614297600,
          y: 1.2936843309352513,
        },
        {
          x: 1614384000,
          y: 1.2918701656050957,
        },
        {
          x: 1614470400,
          y: 1.3644879694656489,
        },
        {
          x: 1614556800,
          y: 1.3479327307692308,
        },
        {
          x: 1614643200,
          y: 1.3094418531468526,
        },
        {
          x: 1614729600,
          y: 1.301007401315789,
        },
        {
          x: 1614816000,
          y: 1.2875538515624998,
        },
        {
          x: 1614902400,
          y: 1.323912208053692,
        },
        {
          x: 1614988800,
          y: 1.352091625,
        },
        {
          x: 1615075200,
          y: 1.3697756849315073,
        },
        {
          x: 1615161600,
          y: 1.4102301354838704,
        },
        {
          x: 1615248000,
          y: 1.3111606500000001,
        },
        {
          x: 1615334400,
          y: 1.299936744966443,
        },
        {
          x: 1615420800,
          y: 1.2848289015151508,
        },
        {
          x: 1615507200,
          y: 1.314888066666667,
        },
        {
          x: 1615593600,
          y: 1.407024188811188,
        },
        {
          x: 1615680000,
          y: 1.3161392038216555,
        },
        {
          x: 1615766400,
          y: 1.3563101891891882,
        },
        {
          x: 1615852800,
          y: 1.3241554765100665,
        },
        {
          x: 1615939200,
          y: 1.2929001544117644,
        },
        {
          x: 1616025600,
          y: 1.2618810921052628,
        },
        {
          x: 1616112000,
          y: 1.3230333175675675,
        },
        {
          x: 1616198400,
          y: 1.3352810064935066,
        },
        {
          x: 1616284800,
          y: 1.4553190641025637,
        },
        {
          x: 1616371200,
          y: 1.3574443841059602,
        },
        {
          x: 1616457600,
          y: 1.3523681428571432,
        },
        {
          x: 1616544000,
          y: 1.3536179868421052,
        },
        {
          x: 1616630400,
          y: 1.3164960000000003,
        },
        {
          x: 1616716800,
          y: 1.318635669117647,
        },
        {
          x: 1616803200,
          y: 1.2981473333333333,
        },
        {
          x: 1616889600,
          y: 1.3152392515723268,
        },
        {
          x: 1616976000,
          y: 1.2829920132450328,
        },
        {
          x: 1617062400,
          y: 1.31233240410959,
        },
        {
          x: 1617148800,
          y: 1.3453399490445856,
        },
        {
          x: 1617235200,
          y: 1.336590924137931,
        },
        {
          x: 1617321600,
          y: 1.314276628571429,
        },
        {
          x: 1617408000,
          y: 1.3121621603053437,
        },
        {
          x: 1617494400,
          y: 1.3700521849315066,
        },
      ],
    }
    this.setState({ stats })
  }

  render() {
    const { stats } = this.state
    return (
      <div className='flex column'>
        {stats && (
          <LineChart
            data={{
              labels: this.state.stats.values.map((currVal) => currVal.x),
              scales: {
                x: {
                  type: 'time',
                  time: {
                    displayFormats: {
                      quarter: 'MMM YYYY',
                    },
                  },
                },
              },
              datasets: [
                {
                  label: 'Block size',
                  data: this.state.stats.values.map((currVal) => currVal.y),
                  fill: false,
                  backgroundColor: [617594],
                },
              ],
            }}
            options={{
              scales: {
                xAxes: [
                  {
                    title: 'time',
                    type: 'time',
                    gridLines: {
                      lineWidth: 2,
                    },
                    time: {
                      unit: 'day',
                      unitStepSize: 1000,
                      displayFormats: {
                        millisecond: 'MMM DD',
                        second: 'MMM DD',
                        minute: 'MMM DD',
                        hour: 'MMM DD',
                        day: 'MMM DD',
                        week: 'MMM DD',
                        month: 'MMM DD',
                        quarter: 'MMM DD',
                        year: 'MMM DD',
                      },
                    },
                  },
                ],
              },
            }}
          />
        )}
        <h3>Block size</h3>
      </div>
    )
  }
}
