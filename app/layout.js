import "@/node_modules/react-modal-video/css/modal-video.css"
import { Inter, Jost } from 'next/font/google'
import "/public/assets/css/bootstrap.min.css"
import "/public/assets/css/common-style.css"
import "/public/assets/css/dark-mode.css"
import "/public/assets/css/line-awesome.min.css"
import "/public/assets/css/main.css"
import "/public/assets/css/posty-color.css"
import "/public/assets/css/swiper.min.css"
import "/public/assets/css/venobox.min.css"
import { ThemeProvider } from 'next-themes';


const inter = Inter({
	weight: ['200', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: "--body-font",
	display: 'swap',
})

const jost = Jost({
	weight: ['200', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: "--secondary-font",
	display: 'swap',
})


export const metadata = {
	title: 'YaariYo',
	description: 'Friendhip first Social media platfrom',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
					className={`${inter.variable} ${jost.variable}`}
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}