import { injectGlobal } from 'styled-components'
import Muli from '../assets/fonts/Muli-Regular.ttf'
import NunitoReg from '../assets/fonts/Nunito-Regular.ttf'
import NunitoBold from '../assets/fonts/Nunito-Bold.ttf'
import NunitoExtraBold from '../assets/fonts/Nunito-ExtraBold.ttf'

injectGlobal`
  @font-face {
    font-family: Muli;
    src: url('${Muli}') format('opentype');
  }
  @font-face {
    font-family: NunitoBold;
    src: url('${NunitoBold}') format('opentype');
  }
  @font-face {
    font-family: NunitoReg;
    src: url('${NunitoReg}') format('opentype');
  }
  @font-face {
    font-family: NunitoExtraBold;
    src: url('${NunitoExtraBold}') format('opentype');
  }

  * {
      font-family: NunitoReg;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-size: 18;
      text-decoration: none;
      letter-spacing:  0.6px;
  }

  body {
    margin: 0;
  }

  a {
    color: #FFF;
  }

`
