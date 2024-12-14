import React, { useState } from 'react'
import { Modal, Button, Card } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const SettingComponent = () => {
  const allCities = [
    {
      name: 'New York',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/800px-New_york_times_square-terabass.jpg',
    },
    { name: 'Paris', img: 'https://www.theinvisibletourist.com/wp-content/uploads/2022/02/featured_215.jpg' },
    {
      name: 'London',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/640px-London_Skyline_%28125508655%29.jpeg',
    },
    {
      name: 'Tokyo',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/640px-Skyscrapers_of_Shinjuku_2009_January.jpg',
    },
    {
      name: 'Dubai',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBO5pN8RAgeOQr58-Jd5RNjOX62MMHbkAjRA&s',
    },
    { name: 'Sydney', img: 'https://via.placeholder.com/150?text=Sydney' },
    { name: 'Barcelona', img: 'https://via.placeholder.com/150?text=Barcelona' },
    { name: 'Berlin', img: 'https://via.placeholder.com/150?text=Berlin' },
    { name: 'Rome', img: 'https://via.placeholder.com/150?text=Rome' },
    { name: 'Moscow', img: 'https://via.placeholder.com/150?text=Moscow' },
  ]
  const allNews = [
    {
      title: 'Top 10 Attractions in New York',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg',
    },
    {
      title: 'Paris: A Journey through Time',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyRpHn5gVvIODBH-3jE798yAplgVocS027FA&s',
    },
    {
      title: "Discover London's Hidden Gems",
      img: 'https://www.studying-in-uk.org/wp-content/uploads/2019/05/study-in-london-1068x641.jpg',
    },
    {
      title: "Experience Tokyo's Nightlife",
      img: 'https://assets.editorial.aetnd.com/uploads/2013/07/gettyimages-1390815938.jpg',
    },
    {
      title: 'Dubai: Luxury and Culture',
      img: 'https://www.agoda.com/wp-content/uploads/2024/08/Jumeirah-beach-in-Dubai-United-Arab-Emirates-featured-1244x700.jpg',
    },
    { title: 'Sydney: Beyond the Opera House', img: 'https://via.placeholder.com/150?text=Sydney+News' },
    { title: "Barcelona's Architectural Wonders", img: 'https://via.placeholder.com/150?text=Barcelona+News' },
    { title: 'Berlin: A Historical Tour', img: 'https://via.placeholder.com/150?text=Berlin+News' },
    { title: 'Rome: The Eternal City', img: 'https://via.placeholder.com/150?text=Rome+News' },
    { title: 'Moscow: A Modern Metropolis', img: 'https://via.placeholder.com/150?text=Moscow+News' },
  ]

  const [displayedCities, setDisplayedCities] = useState(allCities.slice(0, 5))
  const [displayedNews, setDisplayedNews] = useState(allNews.slice(0, 5))
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentList, setCurrentList] = useState([])
  const [listType, setListType] = useState('')

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(currentList)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    if (listType === 'cities') {
      setDisplayedCities(items)
    } else if (listType === 'news') {
      setDisplayedNews(items)
    }
    setCurrentList(items)
  }

  const openModal = (type) => {
    setListType(type)
    setCurrentList(type === 'cities' ? allCities : allNews)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    if (listType === 'cities') {
      setDisplayedCities(currentList)
    } else if (listType === 'news') {
      setDisplayedNews(currentList)
    }
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Settings</h2>

      <div style={{ marginBottom: '20px' }}>
        <Card title="Displayed Cities" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {displayedCities.map((city, index) => (
              <Card
                key={index}
                hoverable
                cover={<img alt={city.name} src={city.img} style={{ height: '150px', objectFit: 'cover' }} />}
                style={{ width: '150px' }}
              >
                <Card.Meta title={city.name} />
              </Card>
            ))}
          </div>
          <Button type="primary" onClick={() => openModal('cities')} style={{ marginTop: '10px' }}>
            Edit Cities
          </Button>
        </Card>
      </div>

      <div>
        <Card title="Displayed News">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {displayedNews.map((news, index) => (
              <Card
                key={index}
                hoverable
                cover={<img alt={news.title} src={news.img} style={{ height: '150px', objectFit: 'cover' }} />}
                style={{ width: '250px' }}
              >
                <Card.Meta title={news.title} />
              </Card>
            ))}
          </div>
          <Button type="primary" onClick={() => openModal('news')} style={{ marginTop: '10px' }}>
            Edit News
          </Button>
        </Card>
      </div>

      <Modal
        title={`Edit Displayed ${listType === 'cities' ? 'Cities' : 'News'}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                {currentList.map((item, index) => (
                  <Draggable key={item.name || item.title} draggableId={item.name || item.title} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: '10px',
                          marginBottom: '8px',
                          background: '#fff',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.name || item.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Modal>
    </div>
  )
}

export default SettingComponent
