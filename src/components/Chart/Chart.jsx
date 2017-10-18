/*
   Copyright 2017 IBM Corp.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts';

const predictionsMapping = require('../../../config/model.json')['model-prediction-mapping'];

const propTypes = {
  onAlert: PropTypes.func
};

class Chart extends Component {
  constructor (props) {
    super(props);
    this.state = {
      deployments: []
    };

    console.log('Chart props- ', props);

    let probability = props.scoringResult.probability.values;
    // translate index to a product and sort descendingly
    this.probability = probability.map((val, index) => ({product: predictionsMapping[index], value: Math.round(val * 100)}))
    .sort((a, b) => b.value - a.value);
  }

  componentWillMount () {
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div>
        <BarChart width={700} height={300} data={this.probability} layout='vertical'
            margin={{top: 25, right: 10, left: 10, bottom: 15}}>
           <XAxis type="number" dataKey="value"/>
           <YAxis type="category" dataKey="product"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="value" fill="#1d3749" />
        </BarChart>
      </div>
    );
  }
}

Chart.propTypes = propTypes;

module.exports = Chart;
