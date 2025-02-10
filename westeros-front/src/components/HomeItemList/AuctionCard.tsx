import { Card, CardMedia, CardContent, Typography, Chip, Box } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import {AuctionItemProps} from "../item";


const AuctionCard : React.FC<AuctionItemProps>  = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 200, boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
      {/* Imagen del producto */}
      <CardMedia
        component="img"
        sx={{ width: "100%", height: 180, objectFit: "contain", background: "#f8f8f8" }}
        image={item.image}
        alt={item.title}
      />

      <CardContent sx={{ textAlign: "center", padding: 1 }}>
        {/* Nombre del producto */}
        <Typography variant="body2" sx={{ fontWeight: 500, height: 40, overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.title}
        </Typography>

        {/* Última puja */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          <Chip
            icon={<GavelIcon />}
            label={`Última puja: $${item.lastBid.toFixed(2)}`}
            color="primary"
            variant="outlined"
            sx={{ fontSize: 12 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuctionCard;