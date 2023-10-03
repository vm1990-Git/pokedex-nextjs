import { Inter } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import './global.css'
import { FilterContextProvider } from './context/FilterContext'
import { PokemonListContextProvider } from './context/PokemonListContext'
import { OffsetContextProvider } from './context/OffsetContext'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokedex',
  description: 'Pokedex page created with next.js',
  icons: {
    icon: [
      '/favicon.ico?v-3',
    ],
    appe: [
      '/apple-touch-icon.png?v-4'
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ]

  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PokemonListContextProvider>
          <FilterContextProvider>
            <OffsetContextProvider>
              <Navbar />
              {children}
            </OffsetContextProvider>
          </FilterContextProvider>
        </PokemonListContextProvider>
      </body>
    </html>
  )
}
