package com.f3pro.dsvendas.services;

import com.f3pro.dsvendas.dto.SaleDTO;
import com.f3pro.dsvendas.dto.SaleSuccessDTO;
import com.f3pro.dsvendas.dto.SaleSumDTO;
import com.f3pro.dsvendas.entities.Sale;
import com.f3pro.dsvendas.repositories.SaleRepository;
import com.f3pro.dsvendas.repositories.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SaleService {

    @Autowired
    private SaleRepository repository;
    @Autowired
    private SellerRepository sellerRepository;

    @Transactional(readOnly = true)
    public Page<SaleDTO> findAll(Pageable pageable) {
        sellerRepository.findAll();
        Page<Sale> result = repository.findAll(pageable);
        return result.map(x -> new SaleDTO(x));
    }
    @Transactional(readOnly = true)
    public List<SaleSumDTO> amountGrupedBySeller(){
     return  repository.amountGrupedBySeller();
    }

    @Transactional(readOnly = true)
    public List<SaleSuccessDTO> successGrupedBySeller(){
        return  repository.successGrupedBySeller();
    }

}
