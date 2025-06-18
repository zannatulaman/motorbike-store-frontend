import Banner from '@/components/Banner'
import BestSeller from '@/components/BestSeller'
import Categories from '@/components/Categories'
import Marquee from '@/components/Marquee'
import MidBanner from '@/components/MidBanner'
import PerfectProduct from '@/components/PerfectProduct'
import Testimonial from '@/components/Testimonial'


const HomePage = () => {
  return (
    <div>
       <Banner />
       <BestSeller />
       <Marquee />
       <MidBanner />
       <Categories />
       <PerfectProduct />
       <Testimonial />
    </div>
  )
}

export default HomePage