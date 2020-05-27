import React  from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import Icon from '../Icon/icon'

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  } else {
    return true
  }
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name_docx', {
    type: file.type
  })
  return Promise.resolve(newFile)
}

const SingleUpload = () => {
  return (
    <Upload 
      // action="https://jsonplaceholder.typicode.com/posts/"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('changed')}
      // beforeUpload={checkFileSize}
      // beforeUpload={filePromise}
      // defaultFileList={defaultFileList}
      name="cyc-file"
      data={{key: 'abc'}}
      headers={{'X-Powered-By': 'cyc'}}
      accept=".jpg"
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
    </Upload>
  )
}

storiesOf('Upload Component', module)
  .add('Upload', SingleUpload)