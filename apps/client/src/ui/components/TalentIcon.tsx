import type { SvgIconProps } from '@mui/material';

import DefaultIcon from '@mui/icons-material/AddRounded';

import { StatisticBaseIcon } from './statistics/StatisticBaseIcon';

interface TalentIconProps extends Omit<SvgIconProps, 'type'> {
   id: string;
}

export const TalentIcon = ({ id, ...rest }: TalentIconProps) =>
   ({
      '1': <StatisticBaseIcon {...rest} color="strength" path="strength" type="plus" />,
      '2': <StatisticBaseIcon {...rest} color="vitality" path="vitality" type="plus" />,
      '3': <StatisticBaseIcon {...rest} color="strength" path="strength" type="damages" />,
      '4': <StatisticBaseIcon {...rest} color="strength" path="strength" type="damages" />,
      '5': <StatisticBaseIcon {...rest} color="vitality" path="vitality" type="plus" />,
      '7': <StatisticBaseIcon {...rest} color="strength" path="strength" type="percent" />,
      '11': <DefaultIcon {...rest} />,
      '12': <DefaultIcon {...rest} />,
      '13': <DefaultIcon {...rest} />,
      '14': <DefaultIcon {...rest} />,
      '15': <DefaultIcon {...rest} />,
      '16': <DefaultIcon {...rest} />,
      '17': <DefaultIcon {...rest} />,
      '18': <DefaultIcon {...rest} />,
      '19': <DefaultIcon {...rest} />,
      '20': <DefaultIcon {...rest} />,
      '21': <DefaultIcon {...rest} />,
      '22': <DefaultIcon {...rest} />,
      '23': <DefaultIcon {...rest} />,
      '24': <DefaultIcon {...rest} />,
      '25': <DefaultIcon {...rest} />,
      '26': <DefaultIcon {...rest} />,
      '27': <DefaultIcon {...rest} />,
      '28': <DefaultIcon {...rest} />,
      '29': <DefaultIcon {...rest} />,
      '30': <DefaultIcon {...rest} />,
      '31': <DefaultIcon {...rest} />,
      '32': <DefaultIcon {...rest} />,
      '33': <DefaultIcon {...rest} />,
      '34': <DefaultIcon {...rest} />,
      '35': <DefaultIcon {...rest} />,
      '36': <DefaultIcon {...rest} />,
      '37': <DefaultIcon {...rest} />,
      '38': <DefaultIcon {...rest} />,
      '39': <DefaultIcon {...rest} />,
      '40': <DefaultIcon {...rest} />,
      '41': <DefaultIcon {...rest} />,
      '42': <DefaultIcon {...rest} />,
      '43': <DefaultIcon {...rest} />,
      '44': <DefaultIcon {...rest} />,
      '45': <DefaultIcon {...rest} />,
      '46': <DefaultIcon {...rest} />,
      '47': <DefaultIcon {...rest} />,
      '48': <DefaultIcon {...rest} />,
      '49': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" type="plus" />,
      '50': <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" type="plus" />,
      '51': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" type="damages" />,
      '52': <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" type="plus" />,
      '53': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" type="damages" />,
      '54': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" type="percent" />,
      '55': <DefaultIcon {...rest} />,
      '56': <DefaultIcon {...rest} />,
      '57': <DefaultIcon {...rest} />,
      '58': <DefaultIcon {...rest} />,
      '59': <DefaultIcon {...rest} />,
      '60': <DefaultIcon {...rest} />,
      '61': <DefaultIcon {...rest} />,
      '62': <DefaultIcon {...rest} />,
      '63': <DefaultIcon {...rest} />,
      '64': <DefaultIcon {...rest} />,
      '65': <DefaultIcon {...rest} />,
      '66': <DefaultIcon {...rest} />,
      '67': <DefaultIcon {...rest} />,
      '68': <DefaultIcon {...rest} />,
      '69': <DefaultIcon {...rest} />,
      '70': <DefaultIcon {...rest} />,
      '71': <DefaultIcon {...rest} />,
      '72': <DefaultIcon {...rest} />,
      '73': <DefaultIcon {...rest} />,
      '74': <DefaultIcon {...rest} />,
      '75': <DefaultIcon {...rest} />,
      '76': <DefaultIcon {...rest} />,
      '77': <DefaultIcon {...rest} />,
      '78': <DefaultIcon {...rest} />,
      '79': <DefaultIcon {...rest} />,
      '80': <DefaultIcon {...rest} />,
      '81': <DefaultIcon {...rest} />,
      '82': <DefaultIcon {...rest} />,
      '83': <DefaultIcon {...rest} />,
      '84': <DefaultIcon {...rest} />,
      '85': <DefaultIcon {...rest} />,
      '86': <DefaultIcon {...rest} />,
      '87': <DefaultIcon {...rest} />,
      '88': <DefaultIcon {...rest} />,
      '89': <DefaultIcon {...rest} />,
      '90': <DefaultIcon {...rest} />,
      '91': <DefaultIcon {...rest} />,
      '92': <DefaultIcon {...rest} />,
      '93': <DefaultIcon {...rest} />,
      '94': <DefaultIcon {...rest} />,
      '95': <DefaultIcon {...rest} />,
      '96': <DefaultIcon {...rest} />,
      '97': <DefaultIcon {...rest} />,
      '98': <DefaultIcon {...rest} />,
      '99': <DefaultIcon {...rest} />,
      '100': <DefaultIcon {...rest} />,
      '101': <DefaultIcon {...rest} />,
      '102': <DefaultIcon {...rest} />,
      '103': <DefaultIcon {...rest} />,
      '104': <DefaultIcon {...rest} />,
      '105': <DefaultIcon {...rest} />,
      '108': <DefaultIcon {...rest} />,
      '109': <DefaultIcon {...rest} />,
      '110': <StatisticBaseIcon {...rest} color="luck" path="luck" type="plus" />,
      '111': <StatisticBaseIcon {...rest} color="luck" path="luck" type="damages" />,
      '112': <StatisticBaseIcon {...rest} color="evasion" path="evasion" type="plus" />,
      '113': <StatisticBaseIcon {...rest} color="prospect" path="prospect" type="plus" />,
      '114': <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" type="plus" />,
      '115': <StatisticBaseIcon {...rest} color="luck" path="luck" type="percent" />,
      '116': <DefaultIcon {...rest} />,
      '117': <DefaultIcon {...rest} />,
      '118': <DefaultIcon {...rest} />,
      '119': <DefaultIcon {...rest} />,
      '120': <DefaultIcon {...rest} />,
      '121': <DefaultIcon {...rest} />,
      '122': <DefaultIcon {...rest} />,
      '123': <DefaultIcon {...rest} />,
      '124': <DefaultIcon {...rest} />,
      '125': <DefaultIcon {...rest} />,
      '126': <DefaultIcon {...rest} />,
      '127': <DefaultIcon {...rest} />,
      '128': <DefaultIcon {...rest} />,
      '129': <DefaultIcon {...rest} />,
      '130': <DefaultIcon {...rest} />,
      '131': <DefaultIcon {...rest} />,
      '132': <DefaultIcon {...rest} />,
      '133': <DefaultIcon {...rest} />,
      '134': <DefaultIcon {...rest} />,
      '135': <DefaultIcon {...rest} />,
      '136': <DefaultIcon {...rest} />,
      '137': <DefaultIcon {...rest} />,
      '138': <DefaultIcon {...rest} />,
      '139': <DefaultIcon {...rest} />,
      '140': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" type="plus" />,
      '141': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" type="damages" />,
      '142': <StatisticBaseIcon {...rest} color="evasion" path="evasion" type="plus" />,
      '143': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" type="damages" />,
      '144': <StatisticBaseIcon {...rest} color="evasion" path="evasion" type="plus" />,
      '145': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" type="percent" />,
      '146': <DefaultIcon {...rest} />,
      '147': <DefaultIcon {...rest} />,
      '148': <DefaultIcon {...rest} />,
      '149': <DefaultIcon {...rest} />,
      '150': <DefaultIcon {...rest} />,
      '151': <DefaultIcon {...rest} />,
      '152': <DefaultIcon {...rest} />,
      '153': <DefaultIcon {...rest} />,
      '154': <DefaultIcon {...rest} />,
      '155': <DefaultIcon {...rest} />,
      '156': <DefaultIcon {...rest} />,
      '157': <DefaultIcon {...rest} />,
      '158': <DefaultIcon {...rest} />,
      '159': <DefaultIcon {...rest} />,
      '160': <DefaultIcon {...rest} />,
      '161': <DefaultIcon {...rest} />,
      '162': <DefaultIcon {...rest} />,
      '163': <DefaultIcon {...rest} />,
      '164': <DefaultIcon {...rest} />,
      '165': <DefaultIcon {...rest} />,
      '166': <DefaultIcon {...rest} />,
      '167': <DefaultIcon {...rest} />,
      '168': <DefaultIcon {...rest} />,
      '169': <DefaultIcon {...rest} />,
      '171': <DefaultIcon {...rest} />,
      '172': <DefaultIcon {...rest} />,
      '173': <DefaultIcon {...rest} />,
      '174': <DefaultIcon {...rest} />,
      '175': <DefaultIcon {...rest} />,
      '176': <DefaultIcon {...rest} />,
      '178': <DefaultIcon {...rest} />,
      '179': <DefaultIcon {...rest} />,
      '180': <DefaultIcon {...rest} />,
      '181': <DefaultIcon {...rest} />,
      '182': <DefaultIcon {...rest} />,
      '183': <DefaultIcon {...rest} />,
      '184': <DefaultIcon {...rest} />,
      '185': <DefaultIcon {...rest} />,
      '186': <DefaultIcon {...rest} />,
      '187': <DefaultIcon {...rest} />,
      '188': <DefaultIcon {...rest} />,
      '189': <DefaultIcon {...rest} />,
      '190': <DefaultIcon {...rest} />,
      '191': <DefaultIcon {...rest} />,
      '192': <DefaultIcon {...rest} />,
      '193': <DefaultIcon {...rest} />,
      '194': <DefaultIcon {...rest} />,
      '195': <DefaultIcon {...rest} />,
      '196': <DefaultIcon {...rest} />,
      '197': <DefaultIcon {...rest} />,
      '198': <DefaultIcon {...rest} />,
      '199': <DefaultIcon {...rest} />,
      '200': <DefaultIcon {...rest} />,
      '201': <DefaultIcon {...rest} />,
      '202': <DefaultIcon {...rest} />,
      '203': <DefaultIcon {...rest} />,
      '204': <DefaultIcon {...rest} />,
      '205': <DefaultIcon {...rest} />,
      '206': <DefaultIcon {...rest} />,
      '207': <DefaultIcon {...rest} />,
      '208': <DefaultIcon {...rest} />,
      '209': <DefaultIcon {...rest} />,
      '210': <DefaultIcon {...rest} />,
      '211': <DefaultIcon {...rest} />,
      '212': <DefaultIcon {...rest} />,
      '213': <DefaultIcon {...rest} />,
      '214': <DefaultIcon {...rest} />,
      '215': <DefaultIcon {...rest} />,
      '216': <DefaultIcon {...rest} />,
      '217': <DefaultIcon {...rest} />,
      '218': <DefaultIcon {...rest} />,
      '219': <DefaultIcon {...rest} />,
      '220': <DefaultIcon {...rest} />,
      '221': <DefaultIcon {...rest} />,
      '222': <DefaultIcon {...rest} />,
      '223': <DefaultIcon {...rest} />,
      '224': <DefaultIcon {...rest} />,
      '225': <DefaultIcon {...rest} />,
      '226': <DefaultIcon {...rest} />,
      '227': <DefaultIcon {...rest} />,
      '228': <DefaultIcon {...rest} />,
      '229': <DefaultIcon {...rest} />,
      '230': <DefaultIcon {...rest} />,
      '231': <DefaultIcon {...rest} />,
      '232': <DefaultIcon {...rest} />,
      '233': <DefaultIcon {...rest} />,
      '234': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" type="plus" />,
      '235': <StatisticBaseIcon {...rest} color="luck" path="luck" type="plus" />,
      '236': <StatisticBaseIcon {...rest} color="initiative" path="initiative" type="plus" />,
      '237': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" type="plus" />,
      '238': <StatisticBaseIcon {...rest} color="initiative" path="initiative" type="plus" />,
      '239': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" type="plus" />,
      '240': <StatisticBaseIcon {...rest} color="luck" path="luck" type="plus" />,
      '241': <StatisticBaseIcon {...rest} color="strength" path="strength" type="plus" />,
      '242': <StatisticBaseIcon {...rest} color="initiative" path="initiative" type="plus" />,
      '243': <StatisticBaseIcon {...rest} color="strength" path="strength" type="plus" />,
      '244': <StatisticBaseIcon {...rest} color="initiative" path="initiative" type="plus" />,
      '245': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" type="plus" />,
      '246': <DefaultIcon {...rest} />,
      '247': <DefaultIcon {...rest} />,
      '248': <DefaultIcon {...rest} />,
      '249': <DefaultIcon {...rest} />,
      '251': <DefaultIcon {...rest} />,
      '252': <DefaultIcon {...rest} />,
      '253': <DefaultIcon {...rest} />,
      '254': <DefaultIcon {...rest} />,
      '256': <DefaultIcon {...rest} />,
      '257': <DefaultIcon {...rest} />,
      '258': <DefaultIcon {...rest} />,
      '259': <DefaultIcon {...rest} />,
      '260': <DefaultIcon {...rest} />,
      '261': <DefaultIcon {...rest} />,
      '262': <DefaultIcon {...rest} />,
      '263': <DefaultIcon {...rest} />,
      '264': <DefaultIcon {...rest} />,
      '265': <DefaultIcon {...rest} />,
      '266': <DefaultIcon {...rest} />,
      '267': <DefaultIcon {...rest} />,
      '268': <DefaultIcon {...rest} />,
      '269': <DefaultIcon {...rest} />,
      '270': <DefaultIcon {...rest} />,
      '271': <DefaultIcon {...rest} />,
      '272': <DefaultIcon {...rest} />,
      '273': <DefaultIcon {...rest} />,
      '274': <DefaultIcon {...rest} />,
      '275': <DefaultIcon {...rest} />,
      '276': <DefaultIcon {...rest} />,
      '277': <DefaultIcon {...rest} />,
      '278': <DefaultIcon {...rest} />,
      '279': <DefaultIcon {...rest} />,
      '280': <DefaultIcon {...rest} />,
      '281': <DefaultIcon {...rest} />,
      '282': <DefaultIcon {...rest} />,
      '283': <DefaultIcon {...rest} />,
      '284': <DefaultIcon {...rest} />,
      '285': <DefaultIcon {...rest} />,
      '286': <DefaultIcon {...rest} />,
      '287': <DefaultIcon {...rest} />,
      '288': <DefaultIcon {...rest} />,
      '289': <DefaultIcon {...rest} />,
      '290': <DefaultIcon {...rest} />,
      '291': <DefaultIcon {...rest} />,
      '292': <DefaultIcon {...rest} />,
      '293': <DefaultIcon {...rest} />,
      '294': <DefaultIcon {...rest} />,
      '295': <DefaultIcon {...rest} />,
      '296': <DefaultIcon {...rest} />,
      '297': <DefaultIcon {...rest} />,
      '298': <DefaultIcon {...rest} />,
      '299': <DefaultIcon {...rest} />,
      '300': <DefaultIcon {...rest} />,
      '301': <DefaultIcon {...rest} />,
      '302': <DefaultIcon {...rest} />,
      '303': <DefaultIcon {...rest} />,
      '304': <DefaultIcon {...rest} />,
      '305': <DefaultIcon {...rest} />,
      '306': <DefaultIcon {...rest} />,
      '307': <DefaultIcon {...rest} />,
      '308': <DefaultIcon {...rest} />,
      '309': <DefaultIcon {...rest} />,
      '310': <DefaultIcon {...rest} />,
      '311': <DefaultIcon {...rest} />,
      '312': <DefaultIcon {...rest} />,
      '313': <DefaultIcon {...rest} />,
      '314': <DefaultIcon {...rest} />,
      '316': <DefaultIcon {...rest} />,
      '317': <DefaultIcon {...rest} />,
      '318': <DefaultIcon {...rest} />,
      '319': <DefaultIcon {...rest} />,
      '320': <DefaultIcon {...rest} />,
      '321': <DefaultIcon {...rest} />,
      '322': <DefaultIcon {...rest} />,
      '323': <DefaultIcon {...rest} />,
   })[id] || null;
