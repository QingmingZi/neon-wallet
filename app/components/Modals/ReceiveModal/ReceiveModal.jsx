// @flow
import React, { Component } from 'react'
import BaseModal from '../BaseModal'
import styles from './ReceiveModal.scss'
import QRCode from 'qrcode/lib/browser'
import CopyToClipboard from '../../CopyToClipboard'

type Props = {
    address: string,
    hideModal: Function,
}

class ReceiveModal extends Component<Props> {
  canvas: ?HTMLCanvasElement

  render () {
    const { hideModal, address } = this.props
    return (
      <BaseModal
        onAfterOpen={() => {
          QRCode.toCanvas(this.canvas, address, { version: 5 }, (err) => {
            if (err) console.log(err)
          })
        }}
        title='NEO Wallet Address'
        hideModal={hideModal}
        style={{
          content: {
            width: '420px',
            height: '420px'
          }
        }}
      >
        <div className={styles.textContainer}>
          <div>Your Public NEO Address:</div>
          <div className={styles.address}>
            <strong>{address}</strong>
            <CopyToClipboard text={address} tooltip='Copy Public Address' />
          </div>
          <div className={styles.canvas}><canvas ref={(node) => { this.canvas = node }} /></div>
          <div>Only send assets, such as NEO and GAS, and tokens, such as RPX, that are compatible with the NEO Blockchain.</div>
          <div>Sending any other digital asset or token will result in permanent loss.</div>
        </div>
      </BaseModal>
    )
  }
}

export default ReceiveModal
