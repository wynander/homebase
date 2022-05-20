import Fuse from 'fuse.js'

const options = {
  keys: ['label', 'value', 'fips'],
}

const stateSearchEntries = [
  {
    label: 'Alabama',
    value: 'AL',
    fips: '01',
  },
  {
    label: 'Alaska',
    value: 'AK',
    fips: '02',
  },
  {
    label: 'Arizona',
    value: 'AZ',
    fips: '04',
  },
  {
    label: 'Arkansas',
    value: 'AR',
    fips: '05',
  },
  {
    label: 'California',
    value: 'CA',
    fips: '06',
  },
  {
    label: 'Colorado',
    value: 'CO',
    fips: '08',
  },
  {
    label: 'Connecticut',
    value: 'CT',
    fips: '09',
  },
  {
    label: 'Delaware',
    value: 'DE',
    fips: '10',
  },
  {
    label: 'District of Columbia',
    value: 'DC',
    fips: '11',
  },
  {
    label: 'Florida',
    value: 'FL',
    fips: '12',
  },
  {
    label: 'Georgia',
    value: 'GA',
    fips: '13',
  },
  {
    label: 'Hawaii',
    value: 'HI',
    fips: '15',
  },
  {
    label: 'Idaho',
    value: 'ID',
    fips: '16',
  },
  {
    label: 'Illinois',
    value: 'IL',
    fips: '17',
  },
  {
    label: 'Indiana',
    value: 'IN',
    fips: '18',
  },
  {
    label: 'Iowa',
    value: 'IA',
    fips: '19',
  },
  {
    label: 'Kansas',
    value: 'KS',
    fips: '20',
  },
  {
    label: 'Kentucky',
    value: 'KY',
    fips: '21',
  },
  {
    label: 'Louisiana',
    value: 'LA',
    fips: '22',
  },
  {
    label: 'Maine',
    value: 'ME',
    fips: '23',
  },
  {
    label: 'Maryland',
    value: 'MD',
    fips: '24',
  },
  {
    label: 'Massachusetts',
    value: 'MA',
    fips: '25',
  },
  {
    label: 'Michigan',
    value: 'MI',
    fips: '26',
  },
  {
    label: 'Minnesota',
    value: 'MN',
    fips: '27',
  },
  {
    label: 'Mississippi',
    value: 'MS',
    fips: '28',
  },
  {
    label: 'Missouri',
    value: 'MO',
    fips: '29',
  },
  {
    label: 'Montana',
    value: 'MT',
    fips: '30',
  },
  {
    label: 'Nebraska',
    value: 'NE',
    fips: '31',
  },
  {
    label: 'Nevada',
    value: 'NV',
    fips: '32',
  },
  {
    label: 'New Hampshire',
    value: 'NH',
    fips: '33',
  },
  {
    label: 'New Jersey',
    value: 'NJ',
    fips: '34',
  },
  {
    label: 'New Mexico',
    value: 'NM',
    fips: '35',
  },
  {
    label: 'New York',
    value: 'NY',
    fips: '36',
  },
  {
    label: 'North Carolina',
    value: 'NC',
    fips: '37',
  },
  {
    label: 'North Dakota',
    value: 'ND',
    fips: '38',
  },
  {
    label: 'Ohio',
    value: 'OH',
    fips: '40',
  },
  {
    label: 'Oklahoma',
    value: 'OK',
    fips: '41',
  },
  {
    label: 'Oregon',
    value: 'OR',
    fips: '42',
  },
  {
    label: 'Pennsylvania',
    value: 'PA',
    fips: '44',
  },
  {
    label: 'Rhode Island',
    value: 'RI',
    fips: '47',
  },
  {
    label: 'South Carolina',
    value: 'SC',
    fips: '48',
  },
  {
    label: 'South Dakota',
    value: 'SD',
    fips: '49',
  },
  {
    label: 'Tennessee',
    value: 'TN',
    fips: '50',
  },
  {
    label: 'Texas',
    value: 'TX',
    fips: '51',
  },
  {
    label: 'Utah',
    value: 'UT',
    fips: '49',
  },
  {
    label: 'Vermont',
    value: 'VT',
    fips: '50',
  },
  {
    label: 'Virginia',
    value: 'VA',
    fips: '51',
  },
  {
    label: 'Washington',
    value: 'WA',
    fips: '53',
  },
  {
    label: 'West Virginia',
    value: 'WV',
    fips: '54',
  },
  {
    label: 'Wisconsin',
    value: 'WI',
    fips: '55',
  },
  {
    label: 'Wyoming',
    value: 'WY',
    fips: '56',
  },
]

export const stateFuse = new Fuse(stateSearchEntries, options)
