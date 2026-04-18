
import { cn } from "../lib/utils";
import MainLayout from "../layout/MainLayout"
import Step from "../components/Step"
import { useStepsStore } from "../stores/useStepsStore"
export default function Home() {
  const steps = useStepsStore(s => s.words);
  return <MainLayout>
    <div className="w-full bg-blue-mirage">
      <div className="flex flex-col items-center">
        <div className="pt-5">
          <h1 className="text-4xl">Listo?!</h1>
        </div>
        <section className="min-w-120 py-8 border flex flex-col items-center justify-center contenedor">
          {
            //aqui va un map de todos las palabras.
            (() => {
              return steps && steps.map((_, i) => (
                <div key={i} className={cn('item', '-my-6')}>
                  <Step onClick={() => { }} />
                </div>
              ));
            })()
          }
        </section>
      </div>
    </div >
  </MainLayout >
}