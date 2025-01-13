
import PrimarySearchAppBar from "./components/navBar"
import { Container } from "@mui/material"
import FloatingChat from "./components/floatchat"
import AuctionList from "./components/itemList"


export const App = (): JSX.Element => {
  const mockItems = [
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      title: 'Cámara Nikon D3500',
      description: 'Cámara DSLR perfecta para principiantes.',
      lastBid: 450.99,
      timeLeftAuction: 20, 
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/150',
      title: 'iPhone 13 Pro Max',
      description: '128GB, excelente estado.',
      lastBid: 999.99,
      timeLeftAuction: 7200, 
    },
  ];
  return (
    <>    
    <PrimarySearchAppBar />
    <Container sx={{ mt: 4, position: 'fixed', bottom: 0, right: 0, width: '300px', height: '400px' }}>
      {/* <ChatComponent /> */}
    </Container>
    <Container sx = {{mt: 4}}>
     <AuctionList items={mockItems} />;
    </Container>
    <FloatingChat />
    </>
  )
}


