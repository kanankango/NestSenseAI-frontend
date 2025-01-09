import { SidebarLayout } from '@/components/SidebarLayout'
import { GradientText } from '@/components/GradientText'
import { Button } from '@/components/ui/button'

const forumTopics = [
  { title: 'First-Time Moms Support', posts: 152 },
  { title: 'C-Section Recovery', posts: 89 },
  { title: 'Breastfeeding Challenges', posts: 203 },
  { title: 'Sleep Training Tips', posts: 176 },
  { title: 'Postpartum Fitness', posts: 112 },
]

export default function Community() {
  return (
    <SidebarLayout>
      <h1 className="text-3xl font-bold mb-8">
        <GradientText>Community Support</GradientText>
      </h1>
      <div className="bg-card rounded-lg shadow-md overflow-hidden">
        {forumTopics.map((topic, index) => (
          <div key={index} className="p-4 border-b last:border-b-0">
            <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
            <p className="text-muted-foreground">{topic.posts} posts</p>
            <Button variant="link" className="mt-2 text-primary hover:text-primary/80">Join Discussion</Button>
          </div>
        ))}
      </div>
    </SidebarLayout>
  )
}

