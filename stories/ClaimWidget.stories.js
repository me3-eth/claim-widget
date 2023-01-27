import { ClaimWidget } from '../src/me3-claim-widget.js'

export default {
  title: 'Claim Widget'
}

const Template = args => new ClaimWidget(args)

export const Full = Template.bind({})
Full.args = {
  domain: 'worstnftever.eth',
  tokenContractAddress: '0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1'
}
