package com.react.demo.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Items {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        private int id;
        private String item;
        private int qty;
        private int mprice;
        private int price;
        private int sale;
        private int temp;

        @Override
        public String toString() {
                return "Items{" +
                        "id=" + id +
                        ", item='" + item + '\'' +
                        ", qty=" + qty +
                        ", mPrice=" + mprice +
                        ", price=" + price +
                        ", sale=" + sale +
                        ", temp=" + temp +
                        '}';
        }
}
