import './App.css';
import cardDeckItems from './CardDeckItems';
import Auth from './Components/Authentication/Auth';
import CardDeck from './Components/CardDeck/CardDeck';
import Footer from './Components/Footer/Footer';
import Gallery from './Components/Gallery/Gallery';
import HomepageCarousel from './Components/HomepageCarousel/HomepageCarousel';
import NavBar from './Components/NavBar/NavBar';
import ScrollNotification from './Components/ScrollNotification/ScrollNotification';
import Welcome from './Components/Welcome/Welcome';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <div>
      <Auth/>
      <NavBar/>
      <ScrollNotification/>
      <HomepageCarousel/>
      <Welcome/>
      <Gallery/>
      <CardDeck cardItems={cardDeckItems}/>
  <div className='main'>
  Lorem Ipsum
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat et odio et ultrices. Sed consequat tempor libero non fringilla. Ut bibendum a ante sed vestibulum. Nulla posuere facilisis elit, a sollicitudin ligula placerat vel. Sed sit amet convallis arcu, at pretium urna. Nam luctus tortor eu sagittis sagittis. Aenean id arcu interdum, semper libero vitae, rhoncus felis. Pellentesque auctor pulvinar mi sit amet facilisis. Donec a elementum sapien. Sed iaculis libero id nibh viverra, ac ornare enim cursus. Curabitur facilisis, lacus sed elementum suscipit, dui est luctus quam, ultrices ultricies mauris urna a turpis. Donec vulputate, mi quis efficitur mollis, tellus mauris posuere ex, a facilisis erat risus vitae lacus. Donec ac dolor tellus.

Morbi a dui vel lectus sollicitudin bibendum. Maecenas ac fringilla nulla. Phasellus porta nec ligula quis fermentum. Sed tellus quam, vehicula sed massa vel, condimentum aliquam metus. Vivamus lacinia orci sed justo rutrum pharetra. Nam euismod lorem enim, sed sagittis lorem auctor et. Phasellus maximus nibh et metus gravida volutpat. Praesent erat felis, tincidunt nec erat vel, mattis bibendum nulla. Donec nec ante at magna commodo sodales. Etiam nec faucibus risus, a sodales nisi.

Cras a tortor mi. Fusce interdum nunc massa, ut interdum purus ornare eget. Suspendisse at volutpat mi. In tristique tortor ante, at pretium nulla varius in. Suspendisse dapibus mauris eget convallis ultricies. Etiam pharetra orci ex, non lobortis arcu rhoncus eget. Duis eget rutrum diam. Vestibulum nisi metus, pellentesque vitae luctus quis, laoreet ac lorem. Nunc id sem nunc.

Nulla at diam at sem eleifend lobortis vitae fermentum metus. Maecenas a diam sit amet nibh hendrerit tristique id ac metus. Sed nulla justo, pretium et ipsum sed, facilisis volutpat nisl. Phasellus varius orci ornare ultricies maximus. Donec in urna non tortor rhoncus vulputate sed et magna. Donec ut suscipit risus, at maximus ligula. Aliquam vel dui at tortor iaculis tristique. Sed rutrum a magna eget posuere. Ut ullamcorper mauris nisi, scelerisque viverra arcu euismod vel.

Phasellus ornare quam lorem. Cras auctor, magna ut sodales accumsan, tellus eros gravida arcu, eget tristique eros dolor ut quam. Pellentesque nunc orci, dignissim pellentesque vestibulum ornare, pellentesque non felis. In eu tellus dui. Ut suscipit tincidunt diam. Maecenas accumsan ex elementum augue tempor bibendum. Morbi faucibus mauris quis metus consectetur, sed consectetur tellus elementum. Etiam nunc orci, eleifend eget suscipit in, dignissim nec augue. Nullam eget tempor leo. Cras porta sem nec convallis mattis. Aliquam semper faucibus libero, ac eleifend neque bibendum ac. Maecenas nec vestibulum justo.

Sed nec semper erat. Sed id accumsan felis. Donec dapibus tempor ex et tempor. Nulla a venenatis elit, at facilisis nulla. Suspendisse potenti. Proin blandit egestas risus nec cursus. Vestibulum efficitur sem ac tempor sollicitudin. Donec rhoncus libero non nulla interdum, et elementum dui egestas. Aenean hendrerit sem in nibh dignissim hendrerit. Maecenas aliquet orci nec enim porta, sit amet pharetra nisi gravida. Ut lacus urna, finibus et velit non, ornare fringilla leo. Proin sagittis arcu eget sapien dignissim, vel lobortis ante placerat. Nullam fringilla dapibus est nec ornare. Quisque et neque nec tortor feugiat pretium eu a elit. Suspendisse a odio at lacus efficitur molestie non nec dui.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus et est arcu. Quisque tincidunt congue sapien, eu faucibus nunc varius at. Vivamus non dolor congue, vestibulum sem et, lobortis erat. Mauris erat eros, ultrices id lorem dignissim, imperdiet vestibulum diam. Suspendisse condimentum sed risus vel accumsan. Praesent semper eget tellus id hendrerit.

Praesent sodales vitae diam vitae molestie. Nam imperdiet nibh non ornare ornare. Quisque tristique turpis sed feugiat sodales. Ut dignissim ligula tellus, sed lacinia libero sagittis ut. Morbi volutpat mollis euismod. Nunc consectetur magna leo, a mollis massa finibus id. Suspendisse vulputate justo magna, nec consequat tortor sollicitudin vitae. Aliquam nec arcu ut neque volutpat semper non et libero. Nulla consequat convallis diam ac bibendum. Praesent in magna nisl. Sed sit amet faucibus felis, eget laoreet mauris.

Nulla eget consectetur velit. Maecenas scelerisque dolor urna, et viverra velit consectetur in. Sed sagittis nisi condimentum euismod aliquam. Pellentesque ullamcorper neque nulla. Duis convallis erat ac facilisis iaculis. Sed mattis magna ornare aliquet egestas. Duis maximus diam eu massa fermentum, non aliquet neque molestie.

Integer dapibus blandit convallis. Vivamus ut elit eu massa blandit volutpat nec at lorem. Phasellus vel libero sapien. In maximus ante nec turpis elementum, sit amet maximus erat imperdiet. Pellentesque sollicitudin felis ipsum, vel placerat tellus hendrerit id. Etiam aliquam mi sit amet tortor vestibulum varius. In hac habitasse platea dictumst.

Generated 10 paragraphs, 751 words, 5033 bytes of Lorem IpsumLorem Ipsum
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat et odio et ultrices. Sed consequat tempor libero non fringilla. Ut bibendum a ante sed vestibulum. Nulla posuere facilisis elit, a sollicitudin ligula placerat vel. Sed sit amet convallis arcu, at pretium urna. Nam luctus tortor eu sagittis sagittis. Aenean id arcu interdum, semper libero vitae, rhoncus felis. Pellentesque auctor pulvinar mi sit amet facilisis. Donec a elementum sapien. Sed iaculis libero id nibh viverra, ac ornare enim cursus. Curabitur facilisis, lacus sed elementum suscipit, dui est luctus quam, ultrices ultricies mauris urna a turpis. Donec vulputate, mi quis efficitur mollis, tellus mauris posuere ex, a facilisis erat risus vitae lacus. Donec ac dolor tellus.

Morbi a dui vel lectus sollicitudin bibendum. Maecenas ac fringilla nulla. Phasellus porta nec ligula quis fermentum. Sed tellus quam, vehicula sed massa vel, condimentum aliquam metus. Vivamus lacinia orci sed justo rutrum pharetra. Nam euismod lorem enim, sed sagittis lorem auctor et. Phasellus maximus nibh et metus gravida volutpat. Praesent erat felis, tincidunt nec erat vel, mattis bibendum nulla. Donec nec ante at magna commodo sodales. Etiam nec faucibus risus, a sodales nisi.

Cras a tortor mi. Fusce interdum nunc massa, ut interdum purus ornare eget. Suspendisse at volutpat mi. In tristique tortor ante, at pretium nulla varius in. Suspendisse dapibus mauris eget convallis ultricies. Etiam pharetra orci ex, non lobortis arcu rhoncus eget. Duis eget rutrum diam. Vestibulum nisi metus, pellentesque vitae luctus quis, laoreet ac lorem. Nunc id sem nunc.

Nulla at diam at sem eleifend lobortis vitae fermentum metus. Maecenas a diam sit amet nibh hendrerit tristique id ac metus. Sed nulla justo, pretium et ipsum sed, facilisis volutpat nisl. Phasellus varius orci ornare ultricies maximus. Donec in urna non tortor rhoncus vulputate sed et magna. Donec ut suscipit risus, at maximus ligula. Aliquam vel dui at tortor iaculis tristique. Sed rutrum a magna eget posuere. Ut ullamcorper mauris nisi, scelerisque viverra arcu euismod vel.

Phasellus ornare quam lorem. Cras auctor, magna ut sodales accumsan, tellus eros gravida arcu, eget tristique eros dolor ut quam. Pellentesque nunc orci, dignissim pellentesque vestibulum ornare, pellentesque non felis. In eu tellus dui. Ut suscipit tincidunt diam. Maecenas accumsan ex elementum augue tempor bibendum. Morbi faucibus mauris quis metus consectetur, sed consectetur tellus elementum. Etiam nunc orci, eleifend eget suscipit in, dignissim nec augue. Nullam eget tempor leo. Cras porta sem nec convallis mattis. Aliquam semper faucibus libero, ac eleifend neque bibendum ac. Maecenas nec vestibulum justo.

Sed nec semper erat. Sed id accumsan felis. Donec dapibus tempor ex et tempor. Nulla a venenatis elit, at facilisis nulla. Suspendisse potenti. Proin blandit egestas risus nec cursus. Vestibulum efficitur sem ac tempor sollicitudin. Donec rhoncus libero non nulla interdum, et elementum dui egestas. Aenean hendrerit sem in nibh dignissim hendrerit. Maecenas aliquet orci nec enim porta, sit amet pharetra nisi gravida. Ut lacus urna, finibus et velit non, ornare fringilla leo. Proin sagittis arcu eget sapien dignissim, vel lobortis ante placerat. Nullam fringilla dapibus est nec ornare. Quisque et neque nec tortor feugiat pretium eu a elit. Suspendisse a odio at lacus efficitur molestie non nec dui.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus et est arcu. Quisque tincidunt congue sapien, eu faucibus nunc varius at. Vivamus non dolor congue, vestibulum sem et, lobortis erat. Mauris erat eros, ultrices id lorem dignissim, imperdiet vestibulum diam. Suspendisse condimentum sed risus vel accumsan. Praesent semper eget tellus id hendrerit.

Praesent sodales vitae diam vitae molestie. Nam imperdiet nibh non ornare ornare. Quisque tristique turpis sed feugiat sodales. Ut dignissim ligula tellus, sed lacinia libero sagittis ut. Morbi volutpat mollis euismod. Nunc consectetur magna leo, a mollis massa finibus id. Suspendisse vulputate justo magna, nec consequat tortor sollicitudin vitae. Aliquam nec arcu ut neque volutpat semper non et libero. Nulla consequat convallis diam ac bibendum. Praesent in magna nisl. Sed sit amet faucibus felis, eget laoreet mauris.

Nulla eget consectetur velit. Maecenas scelerisque dolor urna, et viverra velit consectetur in. Sed sagittis nisi condimentum euismod aliquam. Pellentesque ullamcorper neque nulla. Duis convallis erat ac facilisis iaculis. Sed mattis magna ornare aliquet egestas. Duis maximus diam eu massa fermentum, non aliquet neque molestie.

Integer dapibus blandit convallis. Vivamus ut elit eu massa blandit volutpat nec at lorem. Phasellus vel libero sapien. In maximus ante nec turpis elementum, sit amet maximus erat imperdiet. Pellentesque sollicitudin felis ipsum, vel placerat tellus hendrerit id. Etiam aliquam mi sit amet tortor vestibulum varius. In hac habitasse platea dictumst.

Generated 10 paragraphs, 751 words, 5033 bytes of Lorem Ipsum
  </div>
  <Footer/>
  </div>
  </AuthProvider>
  );
}

export default App;
