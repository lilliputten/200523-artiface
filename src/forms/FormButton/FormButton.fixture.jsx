/** @module FormButton.fixture
 *  @since 2020.07.20, 19:07
 *  @changed 2020.10.07, 00:28
 */

import React from 'react'
import FormButton from './FormButton'
import FormGroup from '../FormGroup'
import InlineIcon from 'elements/InlineIcon'

import { // Icons (solid)...
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

// Demo styles for cosmos engine
import 'demo.pcss'

export const DemoWrapper = FormGroup // ({ children }) => {

const inlineIcon = <InlineIcon icon={faCheck} className="extraIconClass" />

export default {
  default: <FormButton style="default" text="Default button" className="extraButtonClass" />,
  withInlineIcon: <FormButton icon={inlineIcon} style="default" text="With inline icon" />,
  withIconAsComponent: <FormButton icon={faCheck} style="default" text="With icon as string" />,
  withIconAsString: <FormButton icon="faCheck" style="default" text="With icon as text" />,
  /* // TODO:
   * - onlyIcon
   * - largeIcon
   * - rightIcon
   * - style
   * - fullWidth
   * - type
  */
}
