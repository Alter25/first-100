import MainLayout from "../layout/MainLayout"
import Step from "../components/Step"
export default function Home() {
  return <MainLayout>
    <div className="h-screen w-full bg-blue-mirage">
      <div className="flex flex-col items-center">
        <div className="pt-5">
          <h1 className="text-4xl">Listo?!</h1>
        </div>
        <section>
          {
            //aqui va un map de todos las palabras.
            <Step onClick={() => { }} />
          }
        </section>
      </div>
    </div>
  </MainLayout>
}