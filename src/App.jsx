import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import HomeServices from './pages/Services';
import SingleService from './pages/SingleService'
import HomeBlogs from './pages/Blogs'
import HomeGallery from './pages/Gallery'
import Video from './pages/Video'
import HomeStudios from './pages/Studios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import Appointment from './pages/admin/Appointment'
import Blogs from './pages/admin/Blogs'
import Services from './pages/admin/Services'
import Contactlead from './pages/admin/Contactlead'
import NotFound from './pages/NotFound'
import Addblog from './pages/admin/Addblog'
import Editblog from './pages/admin/Editblog'
import Addservice from './pages/admin/Addservice'
import Editservice from './pages/admin/Editservice'
import SingleBlog from './pages/SingleBlog'
import Metas from './pages/admin/Metas'
import Addmeta from './pages/admin/Addmeta'
import Editmeta from './pages/admin/Editmeta'
import Gallery from './pages/admin/Gallery'
import Addgallery from './pages/admin/Addgallery'
import Facilities from './pages/Facilities'
import Addicon from './pages/admin/Addicon'
import Icons from './pages/admin/Icons'
import Studios from './pages/admin/Studios'
import Addstudio from './pages/admin/Addstudio'
import Editstudio from './pages/admin/Editstudio'
import SingleStudio from './pages/SingleStudio'
import Editicon from './pages/admin/Editicon'
import Aos from 'aos';
import 'aos/dist/aos.css'
import Privacy from './pages/Privacy'

const App = () => {

  useEffect(() => {
    Aos.init({
      offset: 200, duration: 2000
    });
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/services' element={<HomeServices />} />
          <Route path='/services/:slug' element={<SingleService />} />
          <Route path='/blogs' element={<HomeBlogs />} />
          <Route path='/blogs/:slug' element={<SingleBlog />} />
          <Route path='/gallery' element={<HomeGallery />} />
          <Route path='/video' element={<Video />} />
          <Route path='/facilities' element={<Facilities />} />
          <Route path='/studios' element={<HomeStudios />} />
          <Route path='/studios/:slug' element={<SingleStudio />} />
          <Route path='/privacy-policy' element={<Privacy />} />

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/appointment" element={<Appointment />} />
          <Route path="/admin/contact" element={<Contactlead />} />
          <Route path="/admin/blogs" element={<Blogs />} />
          <Route path="/admin/blogs/add" element={<Addblog />} />
          <Route path="/admin/blogs/edit/:slug" element={<Editblog />} />
          <Route path="/admin/services" element={<Services />} />
          <Route path="/admin/services/add" element={<Addservice />} />
          <Route path="/admin/services/edit/:slug" element={<Editservice />} />
          <Route path="/admin/metas" element={<Metas />} />
          <Route path="/admin/metas/add" element={<Addmeta />} />
          <Route path="/admin/metas/edit/:id" element={<Editmeta />} />
          <Route path="/admin/gallery" element={<Gallery />} />
          <Route path="/admin/gallery/add" element={<Addgallery />} />
          <Route path='/admin/icons/add' element={<Addicon />} />
          <Route path='/admin/icons' element={<Icons />} />
          <Route path='/admin/icons/edit/:id' element={<Editicon />} />
          <Route path="/admin/studios" element={<Studios />} />
          <Route path="/admin/studios/add" element={<Addstudio />} />
          <Route path="/admin/studios/edit/:slug" element={<Editstudio />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App