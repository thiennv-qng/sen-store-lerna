import { Space, Tag } from 'antd'

import { util } from '@sentre/senhub'

export type AppTagsProps = { tags?: string[] }

const AppTags = ({ tags = [] }: AppTagsProps) => {
  return (
    <Space size={8} wrap>
      {tags.map((tag, index) => (
        <Tag
          style={{ margin: 0, borderRadius: 4, color: util.randomColor(tag) }}
          color={util.randomColor(tag, 0.2)}
          key={index}
        >
          {tag}
        </Tag>
      ))}
    </Space>
  )
}

export default AppTags
