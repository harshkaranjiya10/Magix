import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"

export default function Page() {
  return (
    <ThemeProvider>
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          Welcome to Magixthenics, Where magic meets strength! Unleash your inner wizard and embark on a fitness journey like no other. With our enchanting workouts and spellbinding community, you'll transform your body and mind in ways you never thought possible. Join us today and experience the magic of Magixthenics! ✨💪
        </div>
        <div>
          Whether you're a beginner or a seasoned fitness enthusiast, Magixthenics offers a variety of workouts and challenges to suit your needs. Our expert trainers will guide you through each step of your fitness journey, ensuring you stay motivated and on track to achieve your goals. Join our community of like-minded individuals and let's make magic happen together! 🌟
        </div>
        <div>
          Ready to start your magical fitness journey? Sign up now and experience the transformative power of Magixthenics! 🚀✨
        </div>
        <Button variant="outline" size="lg" className="self-start">
          Get Started
        </Button>
      </div>
    </div>
  </ThemeProvider>
  )
}
