import { Header } from '../../components/Header'

const forumTopics = [
  { title: 'First-Time Moms Support', posts: 152 },
  { title: 'C-Section Recovery', posts: 89 },
  { title: 'Breastfeeding Challenges', posts: 203 },
  { title: 'Sleep Training Tips', posts: 176 },
  { title: 'Postpartum Fitness', posts: 112 },
]

export default function Community() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">Community Support</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {forumTopics.map((topic, index) => (
            <div key={index} className="p-4 border-b last:border-b-0">
              <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
              <p className="text-gray-600">{topic.posts} posts</p>
              <button className="mt-2 text-pink-600 hover:text-pink-700">Join Discussion</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

